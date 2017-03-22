import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  providers: [TaskService, UserService]
})
export class UpdateTaskComponent implements OnInit {
 
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  model: any = {};
  category: any = {};
  loading = false;
  @Input() complete;
  @Input() task_id;
  public authUser: User[];
  submitted = false;
  private errorMessage;
  error;
  timer;
  id: string;
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
    this.uploader.uploadAll();
  }

  getUserDetails() {
    this.userService.getUser()
    .subscribe(result => {
            if (result === true) {
                this.authUser = this.userService.authUser;
                this.checkForComplete();
            } else {
                this.getUserDetails();
            }
        });
  }

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }

  checkForComplete(): void {
    if(this.complete===true)
      this.timer = setTimeout(this.markAsComplete(this.authUser[0]._id), 20);
  }

  markAsComplete(id:string): void {
    this.submitted = true;
    this.loading = !this.loading;
    let today = Date.now();
    this.model.completed_at = Date.now();
    this.model._id = this.task_id;

    this.fileRename(today);
    console.log(this.model);

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

  fileRename(today: number){
    let fileName: String = '';
    for ( let i=0;i<this.uploader.queue.length;i++){
      if(this.uploader.queue[i].isSuccess){
        let doc_ext =  this.uploader.queue[i].file.name.split('.').pop();
        this.uploader.queue[i].file.name = fileName.concat(today.toString(), '-', this.authUser[0].first_name,'-',(i+1).toString(), '.', doc_ext);
        this.model.attachments[i] = this.uploader.queue[i].file.name;
      }
    }
  }

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