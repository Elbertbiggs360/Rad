import { Injectable }    from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class UserService {

    /*for production server */
    /*private getUserUrl = 'http://10.1.10.54:8080/user';*/
    private getUserUrl = 'https://eradapi.herokuapp.com/user';
    public authUser: User[];
    private id: any;
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.id = currentUser && currentUser.id;
    }

    getUser(): Observable <Boolean> {
      let headers = new Headers();
      let bodyData = {
        'id': `${this.id}`
      }
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('x-access-token', `${this.token}`)
      let requestoptions = new RequestOptions({
          headers: headers
      });
      return this.http
           .post(this.getUserUrl, JSON.stringify(bodyData), requestoptions)
           .map((res: Response) => {
                this.authUser = res.json();
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