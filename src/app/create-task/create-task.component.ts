import { Component, OnInit, Input } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
  loading = true;
  confirmation = 'Task Created';
  action = 'Undo';
  public authUser: User[];

  private today: number;

  color = 'secondary';
  value: any = 10;
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  vertical = false;
  checked: boolean;

  submitted = false;

  private errorMessage;
  error;
  timer;
  success = false;

  constructor(
  	private taskService: TaskService,
    public snackBar: MdSnackBar,
    private userService: UserService,
    private router: Router
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
                this.loading = false;
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
    this.model.start_date = Date.parse(this.model.start_date);
    this.model.created_by = this.authUser[0]._id;
    this.model.duration = this.model.taskLength * 1000 * 60 * 60 * 24;
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
        setTimeout(this.router.navigate(['/']), 1000);
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