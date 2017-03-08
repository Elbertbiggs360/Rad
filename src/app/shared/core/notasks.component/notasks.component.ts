import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from '../../../shared/user';

@Component({
  templateUrl: 'notasks.component.html',
  selector: 'notasks',
  styleUrls: ['./notasks.component.scss']
})

export class NoTasksComponent implements OnInit {
  @Input() tasks: boolean

  constructor() {
    this.tasks = false;
  }

  ngOnInit(): void {
    
  }
}