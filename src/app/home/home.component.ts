import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog} from '@angular/material';

import { CreateTaskComponent } from '../create-task';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

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
  private moreTasks: boolean = false;
  loading: boolean = false;
  someTasks: boolean = false;
  errorMessage: any;
  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    public dialog: MdDialog
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
            } else {
                this.getUserDetails();
            }
        });
  }

  checkNumberOfTasks(){
    if(this.allTasks.length<1){
      this.someTasks = true;
    } else if (this.allTasks.length > 5){
      this.moreTasks = true;
    }
  }

  openDialog() {
    this.dialog.open(CreateTaskComponent);
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

  SetDrawer(instruction: any) {
    console.log(instruction)
    return instruction;
  }

}