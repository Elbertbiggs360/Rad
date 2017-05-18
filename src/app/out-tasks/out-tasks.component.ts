import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog} from '@angular/material';
import { Router } from '@angular/router';


import { CreateTaskComponent } from '../create-task';
import { UpdateTaskComponent } from '../update-task';
import {DialogsService} from '../shared/core/dialogs.service';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'out-tasks',
  templateUrl: './out-tasks.component.html',
  styleUrls: ['./out-tasks.component.scss'],
  providers: [TaskService, UserService]
})
export class OutTasksComponent implements OnInit {

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
  chip_colors = [];
  mode = 'determinate';
  uncategorized = 'Uncategorized';
  public taskProgress;
  bufferValue = 75;
  start;
  male: Boolean = false;
  female: Boolean = false;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    public dialog: MdDialog,
    private dialogsService: DialogsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getAllTasks();
  }
  
  getUserDetails() {
    this.userService.getUser()
    .subscribe(result => {
            if (result === true) {
                this.authUser = this.userService.authUser;
                this.authUser[0].gender=='male'?this.male=true:this.female=true;
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

  openDialog(componentName, activity, length, task_id) {

    switch (componentName) {

      case "UpdateTaskComponent":
        this.dialogsService
            .update(activity, length, task_id)
            .subscribe(res => {
              this.result = res;
            });
        break;
      
      default:
        break;
    }
  }

  getAllTasks(): void {
    this.loading = !this.loading;
    this.taskService.getTasksAssigned().subscribe(
      tasks => {
        this.loading = !this.loading;
        this.allTasks = tasks;
        this.checkNumberOfTasks();
        this.computeProgress(this.allTasks);
        this.computeCategory(this.allTasks);
      },
      error => {
        this.errorMessage = error;
      });
  }

  computeProgress(allTasks: Task[]){
    for(let i=0;i<allTasks.length;i++){
      if(allTasks[i].start_date>=Date.now()){
        this.allTasks[i].progress = Math.floor((allTasks[i].start_date - Date.now())/allTasks[i].duration *1000);
      } else if((allTasks[i].start_date+allTasks[i].duration)>=Date.now()){
        this.allTasks[i].progress = Math.floor((Date.now() - allTasks[i].start_date)/allTasks[i].duration *1000);
      } else {
        this.allTasks[i].progress = 0;
      }
    }

  }

  computeCategory(allTasks: Task[]){
    for(let i=0;i<allTasks.length;i++){
      if(!allTasks[i].category)
        this.allTasks[i].category = "Uncategorized"

      switch (allTasks[i].category) {
        case "licensing":
          this.allTasks[i].category = "Licensing";
          break;

        case "typeApproval":
          this.allTasks[i].category = "Type Approval"
          break;

        case "numbering":
          this.allTasks[i].category = "Numbering";
          this.chip_colors[i] = 'accent';
          break;

        case "qualityOfService":
          this.allTasks[i].category = "Quality Of Service"
          break;

        case "complianceAssessment":
          this.allTasks[i].category = "Compliance Assessment"
          break;

        case "specialAssignment":
          this.allTasks[i].category = "Special Assessment"
          break;

        default:
          this.chip_colors[i] = 'primary';
          break;
      }
    }
  }

  checkGender(gender: String, preferred: String): Boolean {
    if(gender==preferred){
      return true;
    } else {
      return false;
    }
  }

  checkItem(item: any) {
    return (item === undefined || item.length == 0)?false:true;
  }

}