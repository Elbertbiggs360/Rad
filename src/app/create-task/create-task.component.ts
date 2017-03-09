import { Component, OnInit, Input } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [TaskService, UserService]
})
export class CreateTaskComponent implements OnInit {

  model: any = {};
  category: any = {};
  start_date: any;
  loading = false;
  confirmation = 'Task Created';
  action = 'Undo';
  public authUser: User[];

  private today: number;

  color = 'secondary';
  value: any = 40;
  bufferValue = 75;
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  vertical = false;

  submitted = false;

  private errorMessage;
  error;
  timer;
  success = false;

  constructor(
  	private taskService: TaskService,
    public dialogRef: MdDialogRef<CreateTaskComponent>,
    public snackBar: MdSnackBar,
    private userService: UserService
  ){
  }

  ngOnInit(): void {
    this.getUserDetails();
  	this.today = Date.now();
    setInterval(() => {
      this.today = Date.now();
    }, 100);
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

  onSubmit() {
  	this.submitted = true;
  	this.model.created_at = this.today;
  	this.loading = !this.loading;

    this.taskService.createTask(this.model)
        .subscribe(result => {
            if (result === true) {
              this.timer = setTimeout(this.onLoad(), 3000);
            }
        }, 
        errMsg => {
          this.error = errMsg;
          this.timer = setTimeout(this.onLoad(), 3000);
        });
    return this.stopTimer();
  }

	onLoad () {
    	this.loading = !this.loading;
    	if(this.error){
    		this.success = false;
        this.openSnackBar("Failed", "RETRY");
    	} else {
    		this.success = true;
        this.openSnackBar("Task Created", "UNDO");
    	}
	}

  stopTimer() {
      if (this.timer) {
          clearTimeout(this.timer);
      }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, "UNDO", {
      duration: 2000,
    });
  }
}