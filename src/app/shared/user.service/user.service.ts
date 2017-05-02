import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class UserService {

    /*for production server */
    /*private getUserUrl = 'http://10.1.10.54:8080/user';*/
    private getUserUrl = 'https://eradapi.herokuapp.com//user';
    private getUserSubjectsUrl = 'https://eradapi.herokuapp.com//user/subjects';
    public authUser: User[];
    public subjects: User[];
    private id: any;
    public token: string;
    headers;
    requestoptions;

    constructor(private http: Http) {
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      this.id = currentUser && currentUser.id;

      this.headers = new Headers();

      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Accept', 'application/json');
      this.headers.append('x-access-token', `${this.token}`);
      this.requestoptions = new RequestOptions({
          headers: this.headers
      });
    }

    getUser(): Observable <Boolean> {
      return this.http
           .get(`${this.getUserUrl}/${this.id}`, this.requestoptions)
           .map((res: Response) => {
                this.authUser = res.json();
                return true; })
           .catch((err) => this.handleError(err));
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