import { Component, OnInit, Input, EventEmitter } from '@angular/core';

import { User } from '../../../shared/user';

@Component({
  templateUrl: 'feed-loader.component.html',
  selector: 'feed-loader',
  styleUrls: ['./feed-loader.component.scss']
})

export class FeedLoaderComponent implements OnInit {
  @Input() loading: boolean = false;

  ngOnInit(): void {
    
  }
}