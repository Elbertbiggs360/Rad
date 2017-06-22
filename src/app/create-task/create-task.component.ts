import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  model: any = {};
  categories: any = [
    {value: 'licensing', viewValue: 'Licensing'},
    {value: 'typeApproval', viewValue: 'Type Approval'},
    {value: 'numbering', viewValue: 'Numbering'},
    {value: 'qualityOfService', viewValue: 'Quality Of Service'},
    {value: 'complianceAssessment', viewValue: 'Compliance Assessment'},
    {value: 'specialAssignment', viewValue: 'Special Assigment'},
  ];
  start_date: number;
  loading = true;
  confirmation = 'Task Created';
  action = 'Undo';
  public authUser: User[];
  public subjects: User[];
  private id: any;
  private today: number;
  color = 'secondary';
  value: any = 5;
  max = 10;
  min = 1;
  step = 1;
  thumbLabel = true;
  vertical = false;
  checked: boolean;
  submitted = false;
  private errorMessage;
  error;
  timer;
  success = false;
  male: Boolean = false;
  female: Boolean = false;

  constructor(
    private taskService: TaskService,
    public snackBar: MdSnackBar,
    private userService: UserService,
    private router: Router
  ){
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.id = currentUser && currentUser.id;
  }

  ngOnInit(): void {
    this.getUserDetails();
    this.today = Date.now();
    setInterval(() => {
      this.today = Date.now();
    }, 100);
  }

  getUserDetails() {
    this.userService.getUser(this.id)
    .subscribe(result => {
            if (result === true) {
                this.authUser = this.userService.authUser;
                if(this.authUser[0]) {
                  this.getUserSubjects(
                    this.authUser[0].user_permission,
                    this.authUser[0].department,
                    this.authUser[0].division,
                    this.authUser[0].unit
                  );
                  this.authUser[0].gender === 'male' ? this.male = true : this.female = true;
                }
                this.loading = false;
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

  onSubmit() {
    this.submitted = true;
    this.model.created_at = this.today;
    this.model.start_date = this.today;
    this.model.created_by = this.authUser[0]._id;
    this.model.duration = this.model.taskLength * 1000 * 60 * 60 * 24;
    this.loading = !this.loading;

    this.taskService.createTask(this.model)
        .subscribe(result => {
            if (result === true) {
              this.timer = setTimeout(this.onLoad(), 3000);
              this.sendCloseNotification()
            }
        }, 
        errMsg => {
          this.error = errMsg;
          this.timer = setTimeout(this.onLoad(), 3000);
        });
    return this.stopTimer();
  }

  sendCloseNotification(){
    this.notifyParent.emit(true);
  }

  onLoad () {
      this.loading = !this.loading;
      if(this.error){
        this.success = false;
        this.openSnackBar('Failed', 'RETRY');
      } else {
        this.success = true;
        this.openSnackBar('Task Created', 'UNDO');
        setTimeout(this.router.navigate(['/']), 1000);
      }
  }

  stopTimer() {
      if (this.timer) {
          clearTimeout(this.timer);
      }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, 'UNDO', {
      duration: 2000,
    });
  }
  
  checkGender(gender: String, preferred: String): Boolean {
    if(gender==preferred){
      return true;
    } else {
      return false;
    }
  }

}
