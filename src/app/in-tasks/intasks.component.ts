import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog} from '@angular/material';
import { Router } from '@angular/router';

import { UpdateTaskComponent } from '../update-task';
import {DialogsService} from '../shared/core/dialogs.service';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';

@Component({
  selector: '',
  templateUrl: './intasks.component.html',
  styleUrls: ['./intasks.component.scss'],
  providers: [TaskService, UserService]
})
export class InTasksComponent implements OnInit {

  allTasks;
  public authUser: User[];
  priority: String;
  model: any = {};
  private moreTasks: boolean = false; //check if there are more than 5 tasks
  public result: any;
  loading: boolean = false;
  test: boolean = true;
  someTasks: boolean = false;//check if there are some tasks
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
  id: any;
  public available_users;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    public dialog: MdDialog,
    private dialogsService: DialogsService,
    private router: Router
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser && currentUser.id;
    this.available_users = []
    this.allTasks = []
  }

  ngOnInit(): void {
    this.authUser = this.userService.authUser;
    this.getAllTasks();
  }
  
  getUserDetails(id: any) {
    let user_details = this.userService.getUser(id)
    .subscribe(result => {
            if (result === true) {
              this.available_users = this.userService.available_users
            }
        },
        error => {
          this.errorMessage = error;
      });
    let present = false
    var check_data = this.available_users.filter(function( obj ) {
                  return obj._id == id;
                });
    if (check_data.length >= 1){
      present = true
    } else {
      return user_details
    }
  }

  isMale(user){
    if (user.gender=='male'){
      return true
    } else {
      return false
    }
  }

  fetchUserInfo(user_id: any, aggression: number): any {
    if (aggression<1) {
      return
    } else if (this.processInfo(user_id, 'first_name') == false){
      this.getUserDetails(user_id)
      return this.fetchUserInfo(user_id, aggression-1)
    } else {
      let user_name = this.processInfo(user_id, 'first_name')
      return user_name
    }
  }

  processInfo(user_id:any, return_arg: any): any {
    var return_value: any
    var check_data = this.available_users.filter(function( obj ) {
                  return obj._id == user_id;
                });
    if (check_data.length >= 1){
      switch(return_arg){
        case 'profile_pic_url':
          return_value = check_data[0].profile_pic_url;
          break;

        case 'first_name':
          return_value = check_data[0].first_name;
          break;

        case 'gender':
          return_value = check_data[0].gender;
          break;

        default:
          return_value = check_data[0].last_name;
          break;
      }
    } else {
      return_value = false
    }
    return return_value
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
    this.taskService.getTasks().subscribe(
      tasks => {
        this.loading = !this.loading;
        for (let i=0; i<tasks.length;i++){
          this.allTasks.push(tasks[i]);
        }
        this.checkNumberOfTasks();
        this.computeProgress(this.allTasks);
        this.computeCategory(this.allTasks);
        this.getExtraUsers()
      },
      error => {
        this.errorMessage = error;
      });
  }

  getExtraUsers() {
    for (let i=0; i<this.allTasks.length; i++){
      for (let j=0; j<this.allTasks[i].activity.length; j++){
        for (let k=0; k<this.allTasks[i].activity[j].task_comment.length; k++){
          let commentor_name = this.fetchUserInfo(this.allTasks[i].activity[j].task_comment[k].commentor, 2)
          this.allTasks[i].activity[j].task_comment[k].commentor_name = "name"
          if ( commentor_name != undefined ) {
            this.allTasks[i].activity[j].task_comment[k].commentor_name = commentor_name
          }
        }
      }
    }
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