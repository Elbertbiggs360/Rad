import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  providers: [TaskService, UserService]
})
export class UpdateTaskComponent implements OnInit {

  model: any = {};
  category: any = {};
  loading = false;
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
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUser()
    .subscribe(result => {
            if (result === true) {
                this.authUser = this.userService.authUser;
            } else {
                this.getUserDetails();
            }
        });
  }

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }

  markAsComplete(id:string): void {
    this.submitted = true;
    this.loading = !this.loading;
    let today = Date.now();
    this.model.completed_at = today => today = Date.now();

    this.taskService.updateTask(this.model.id, this.model.completed_at)
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