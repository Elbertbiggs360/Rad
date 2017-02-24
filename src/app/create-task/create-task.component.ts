import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../shared/task';
import { TaskService } from '../shared/task.service';

import { User } from '../shared/user';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  providers: [TaskService]
})
export class CreateTaskComponent implements OnInit {

  @Input() authUser: User[];
  model: any = {};
  category: any = {};
  start_date: any;
  loading = false;
  confirmation = 'Task Created';
  action = 'Undo';

  private today: number;

  color = 'secondary';
  value: any = 40;
  bufferValue = 75;
  max = 100;
  min = 0;
  step = 1;
  thumbLabel = true;
  vertical = false;

  submitted = false;

  private errorMessage;
  error;
  timer;
  success = false;

  constructor(
  	private taskService: TaskService
  ){
  }

  ngOnInit(): void {
  	this.today = Date.now();
    setInterval(() => {
      this.today = Date.now();
    }, 100);
  }

  stringAsDate(dateStr) {
    return new Date(dateStr);
  }

  onSubmit() {
  	this.submitted = true;
  	this.model.created_at = this.today;
  	this.loading = !this.loading;

    this.taskService.createTask(this.model)
        .subscribe(result => {
            if (result === true) {
              this.timer = setTimeout(this.onLoad(), 3000);
            }
        }, 
        errMsg => {
          this.error = errMsg;
          this.timer = setTimeout(this.onLoad(), 3000);
        });
    return this.stopTimer();
  }

	onLoad () {
    	this.loading = !this.loading;
    	if(this.error){
    		this.success = false;
    	} else {
    		this.success = true;
    	}
	}

  stopTimer() {
      if (this.timer) {
          clearTimeout(this.timer);
      }
  }
}