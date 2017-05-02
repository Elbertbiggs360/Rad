import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { AuthService } from '../auth.service';

import { Task } from '../task';

@Injectable()
export class TaskService {


  public tasksUrl = 'https://eradapi.herokuapp.com//viewTasks/in';
  public tasksAssignedUrl = 'https://eradapi.herokuapp.com//viewTasks/out';
  public addTasksUrl = 'https://eradapi.herokuapp.com//createTask';
  public searchTasksUrl = 'https://eradapi.herokuapp.com//searchTask';
  public updateTaskUrl = 'https://eradapi.herokuapp.com//tasks/updateTask';
  public fileUploadUrl = 'https://eradapi.herokuapp.com//uploadFile';
  private token: string;
  private id: string;
  headers;
  requestoptions;


  constructor ( private http: Http, private authService: AuthService) {
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

  getTasks(): Observable <Task[]> {
  	return this.http
  	           .get(`${this.tasksUrl}/${this.id}`, this.requestoptions)
			         .map((res) => this.extractData(res))
               .catch((err) => this.handleError(err));
  }

  getTasksAssigned(): Observable <Task[]> {
    return this.http
               .get(`${this.tasksAssignedUrl}/${this.id}`, this.requestoptions)
               .map((res) => this.extractData(res))
               .catch((err) => this.handleError(err));
  }

  createTask(task): Observable <Boolean> {
    return this.http
                   .post(this.addTasksUrl, JSON.stringify(task), this.requestoptions)
                   .map((res: Response) => {
                      this.getTasks();
                      return true;
                   })
                   .catch((err) => this.handleError(err));
  }

  updateTask(model) {
    return this.http
                   .put(this.updateTaskUrl, JSON.stringify(model), this.requestoptions)
                   .map((res: Response) => {
                      return true;
                   })
                   .catch((err) => this.handleError(err));
  }

  private extractData(res: Response) {
  let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
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
