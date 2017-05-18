import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

const URL = 'http://localhost:8080/uploadFile';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  providers: [TaskService, UserService]
})
export class UpdateTaskComponent implements OnInit {
 
  public hasBaseDropZoneOver:boolean = false;
  model: any = {};
  category: any = {};
  loading = false;
  @Input() complete;
  @Input() activity;
  @Input() length;
  @Input() task_id;
  public subjects: User[];
  public authUser: User[];
  submitted = false;
  private errorMessage;
  error;
  timer;
  id: string;
  isChecked = true;
  success = false;

  constructor(
  	private taskService: TaskService,
    public dialogRef: MdDialogRef<UpdateTaskComponent>,
    public snackBar: MdSnackBar,
    private userService: UserService
  ){
    this.model.attachments = [];
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  getUserDetails() {
    this.userService.getUser()
    .subscribe(result => {
            if (result === true) {
              this.authUser = this.userService.authUser;
              if(this.authUser[0]){
                this.getUserSubjects(this.authUser[0].user_permission, this.authUser[0].department, this.authUser[0].division, this.authUser[0].unit);
              }
            } else {
                this.getUserDetails();
            }
        });
  }

  getUserSubjects(user_permission: number, user_department: string, user_division: string, user_unit: string){
    this.userService.getUserSubjects(user_permission, user_department, user_division, user_unit)
        .subscribe(
          subjects => {
            this.subjects = this.userService.subjects;
          },
          error => {
            this.errorMessage = error;
          }
        )
  }

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }

  checkForComplete(): void {
    if(this.complete===true)
      this.timer = setTimeout(this.UpdateTask(this.authUser[0]._id), 20);
  }

  UpdateTask(id:string): void {
    this.submitted = true;
    this.loading = !this.loading;
    let today = Date.now();
    this.model.task_primary = this.authUser[0]._id;
    this.model.completed_at = today;
    this.model.activity = this.activity;
    this.model.length = this.length;
    this.model.task_id = this.task_id

    //this.fileRename(today);
    this.taskService.updateTask(this.model)
        .subscribe(
          result => {
            if (result === true) {
              this.timer = setTimeout(this.onLoad(), 3000);
            }
          },
          errMsg => {
            this.errorMessage = errMsg;
            this.timer = setTimeout(this.onLoad(), 3000);
          }
        );
    return this.stopTimer();
  }

/*  fileRename(today: number){
    let fileName: String = '';
    for ( let i=0;i<this.uploader.queue.length;i++){
      if(this.uploader.queue[i].isSuccess){
        let doc_ext =  this.uploader.queue[i].file.name.split('.').pop();
        this.uploader.queue[i].file.name = fileName.concat(today.toString(), '-', this.authUser[0].first_name,'-',(i+1).toString(), '.', doc_ext);
        this.model.attachments[i] = this.uploader.queue[i].file.name;
      }
    }
  }*/

	onLoad () {
  	this.loading = !this.loading;
  	if(this.error){
  		this.success = false;
      this.openSnackBar("Failed", "RETRY");
  	} else {
  		this.success = true;
      this.openSnackBar("Task updated", "UNDO");
  	}
	}

  stopTimer() {
      if (this.timer) {
          clearTimeout(this.timer);
      }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}