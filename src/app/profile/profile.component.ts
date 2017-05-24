import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog} from '@angular/material';
import { Router } from '@angular/router';

import {DialogsService} from '../shared/core/dialogs.service';

import { User } from '../shared/user';
import { UserService } from '../shared/user.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'my-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public authUser: User[];
  public result: any;
  loading: boolean = false;
  errorMessage: any;
  male: Boolean = false;
  female: Boolean = false;
  private id: any

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public dialog: MdDialog,
    private dialogsService: DialogsService,
    private router: Router
  ) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser && currentUser.id;
  }

  ngOnInit(): void {
    this.getUserDetails();
  }
  
  getUserDetails() {
    this.userService.getUser(this.id)
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

  openDialog(componentName) {

    switch (componentName) {
      case "CreateTaskComponent":
        this.dialogsService.create();
        break;

      case "LogOut":
        this.dialogsService
            .confirm('Confirm Dialog', 'Are you sure you want to log out?')
            .subscribe(res => {
              res===true?this.logout():res=this.result;
            });
        break;
      
      default:
      console.log('test')
        break;
    }
    //test
  }

  checkItem(item: any) {
    return (item === undefined || item.length == 0)?false:true;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}