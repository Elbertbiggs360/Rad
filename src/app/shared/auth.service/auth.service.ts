import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../user';

@Injectable()
export class AuthService {
	
  /*for production server */
	/*private authUrl = 'http://10.1.10.54:8080/authenticate';*/
  private authUrl = 'https://eradapi.herokuapp.com/authenticate'; //document.location

	public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
    
    login(email: string, password: string): Observable <Boolean> {
        let headers = new Headers();
        let data = {
            'email': `${email}`,
            'password': `${password}`
        }
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        let requestoptions = new RequestOptions({
            headers: headers
        });

        return this.http
                   .post(this.authUrl, JSON.stringify(data), requestoptions)
                   .map((res: Response) => {
                       // login successful if there's a jwt token in the response message
                       let token = res.json() && res.json().token;
                       let id = res.json() && res.json().id;
                       if (token) {
                           // set token property
                           this.token = token;
                           // store id and jwt token in local storage to keep user logged in between page refreshes
                           localStorage.setItem('currentUser', JSON.stringify({ id: id, token: token }));

                           // return true to indicate successful login
                           return true;
                       } else {
                           // return false to indicate failed login
                           return false;
                       }
                   })
                   .catch((err) => this.handleError(err));
    }

    public extractData(res: Response) {
        let body = res.json();
        return body;
    }

    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || 'Failed';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}