import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {MdDialog} from '@angular/material';


import { CreateTaskComponent } from '../create-task';
import { UpdateTaskComponent } from '../update-task';
import {DialogsService} from '../shared/core/confirm-dialog';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TaskService, UserService]
})
export class HomeComponent implements OnInit {

  allTasks: Task[];
  public authUser: User[];
  priority: String;
  model: any = {};
  private moreTasks: boolean = false;
  public result: any;
  loading: boolean = false;
  test: boolean = true;
  someTasks: boolean = false;
  errorMessage: any;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    private authService: AuthService,
    public dialog: MdDialog,
    private dialogsService: DialogsService
  ) {}


  ngOnInit(): void {
    this.getUserDetails();
    this.getPriority();
    this.getAllTasks();
  }
  
  getUserDetails() {
    this.userService.getUser()
    .subscribe(result => {
            if (result === true) {
                this.authUser = this.userService.authUser;
            }
        },
        error => {
          this.errorMessage = error;
      });
  }

  checkNumberOfTasks(){
    if(this.allTasks.length<1){
      this.someTasks = true;
    } else if (this.allTasks.length > 5){
      this.moreTasks = true;
    }
  }

  openDialog(componentName) {

    switch (componentName) {
      case "CreateTaskComponent":
        this.dialog.open(CreateTaskComponent);
        break;

      case "UpdateTaskComponent":
        this.dialog.open(UpdateTaskComponent);
        break;

      case "Confirm":
        this.dialogsService
            .confirm('Confirm Dialog', 'Are you sure you want to do this?')
            .subscribe(res => {
              this.result = res;
              console.log(this.result);
            });
        break;
      
      default:
        this.dialog.open(CreateTaskComponent);
        break;
    }
    //test
  }

  getAllTasks(): void {
    this.loading = !this.loading;
    this.taskService.getTasks().subscribe(
      tasks => {
        this.loading = !this.loading;
        this.allTasks = tasks;
        this.checkNumberOfTasks();
      },
      error => {
        this.errorMessage = error;
      });
  }

  getPriority() {
    this.priority = 'high';
  }

  checkItem(item: any) {
    return (item === undefined || item.length == 0)?false:true;
  }

}