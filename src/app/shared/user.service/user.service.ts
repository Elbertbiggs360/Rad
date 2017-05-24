import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class UserService {

    /*for production server */
    /*private getUserUrl = 'http://10.1.10.54:8080/user';*/
    private getUserUrl = 'http://localhost:9090/user';
    private getUserSubjectsUrl = 'http://localhost:9090/user/subjects';
    public authUser: User[];
    public available_users;
    public subjects: User[];
    public token: string;
    private auth_id: any;
    headers;
    requestoptions;
    public availability

    constructor(private http: Http) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.auth_id = currentUser && currentUser.id;

      this.headers = new Headers();

      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Accept', 'application/json');
      this.headers.append('x-access-token', `${this.token}`);
      this.requestoptions = new RequestOptions({
          headers: this.headers
      });
      this.available_users = []
    }

    getUser(user_id: string): Observable <Boolean> {
      let request_update = this.http
           .get(`${this.getUserUrl}/${user_id}`, this.requestoptions)
           .map((res: Response) => {
              if (res.json()[0]._id == this.auth_id && this.authUser == null){
                this.authUser = res.json();
              } else {
                this.available_users.push(res.json()[0])
              }
              return true; })
           .catch((err) => this.handleError(err));
      let check_data = this.available_users.filter(function( obj ) {
                  return obj._id == user_id;
                });
      if (check_data.length >= 1){
        return
      } else {
        return request_update
      }
    }

    getUserSubjects(user_permission: number, user_department: string, user_division, user_unit): Observable <Boolean> {
      let bodyData = {
        'user_permission': `${user_permission}`,
        'user_department': `${user_department}`,
        'user_division': `${user_division}`,
        'user_unit': `${user_unit}`,
      };
      return this.http
                 .post(this.getUserSubjectsUrl, JSON.stringify(bodyData), this.requestoptions)
                 .map((res: Response) => {
                  this.subjects = res.json();
                  return true; })
                 .catch((err) => this.handleError(err));
    }

    public extractData(res: Response) {
        let body = res.json();
        return body;
    }

    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}