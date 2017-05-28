import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';
import { FileUploader } from 'ng2-file-upload';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

const URL = 'http://localhost:9090/uploadFile';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  providers: [TaskService, UserService]
})
export class UpdateTaskComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url:URL});
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
  file_true: Boolean = true;
  timer;
  id: any;
  isChecked = true;
  success = false;

  constructor(
  	private taskService: TaskService,
    public dialogRef: MdDialogRef<UpdateTaskComponent>,
    public snackBar: MdSnackBar,
    private userService: UserService
  ){
    this.model.attachments = [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser && currentUser.id;
  }

  ngOnInit(): void {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are 
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };
    this.getUserDetails();
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;    
    var today = Date.now();
    this.fileRename(today);
  }

  getUserDetails() {
    this.userService.getUser(this.id)
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
    this.model.task_id = this.task_id;

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
      let doc_ext =  this.uploader.queue[i].file.name.split('.').pop();
      this.uploader.queue[i].file.name = fileName.concat(today.toString(), '-', this.authUser[0].first_name,'-',(i+1).toString().toLowerCase(), '.', doc_ext);
      this.model.attachments[i] = this.uploader.queue[i].file.name;
    }
    this.uploader.uploadAll();
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