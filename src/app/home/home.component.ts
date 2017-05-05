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
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [TaskService, UserService]
})
export class HomeComponent implements OnInit {

  public authUser: User[];
  public result: any;
  private errorMessage: any;
  public loading: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MdDialog,
    private dialogsService: DialogsService,
    private router: Router
  ) {
     this.loading = false;
  }

  ngOnInit(): void {
    this.getUserDetails();
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

  openDialog(componentName) {

    switch (componentName) {
      case "CreateTaskComponent":
        this.dialogsService.create();
        break;

      case "LogOut":
        this.dialogsService
            .confirm('Confirm Dialog', 'Are you sure you want to log out?')
            .subscribe(res => {
              res === true ? this.logout() : res = this.result;
            });
        break;
      
      default:
        this.dialog.open(CreateTaskComponent);
        break;
    }
    //test
  }

  checkGender(gender: String, preferred: String): Boolean {
    if(gender === preferred){
      return true;
    } else {
      return false;
    }
  }

  checkItem(item: any) {
    return (item === undefined || item.length === 0)?false:true;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}