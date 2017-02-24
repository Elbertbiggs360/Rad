import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { QuestionService } from '../shared/question.service';

import { User } from '../shared/user';

@Component({
  templateUrl: 'login.component.html',
  providers:  [QuestionService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  payLoad = '';
  model: any = {};
  testUsers: any = {};
  loading = false;
  error = '';
  users: User[] = [];
  questions: any[];

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
        .subscribe(result => {
            if (result === true) {
                this.router.navigate(['/']);
            }
        }, 
        errMsg => {
            this.error = errMsg;
            this.loading = false;
        });
  }
  /*<form (ngSubmit)="onSubmit()" [formGroup]="form">*/
}
