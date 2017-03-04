import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from '../../../shared/user';

@Component({
  templateUrl: 'loader.component.html',
  selector: 'app-loader',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit {
  @Input() loading: boolean = false;

  ngOnInit(): void {
    
  }
}