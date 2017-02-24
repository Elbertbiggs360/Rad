import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../shared/user';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

	@Input() authUser: User[];
  @Output() onDrawn = new EventEmitter<String>();
  drawn: string;

	private errorMessage;

	constructor(){
	}

	ngOnInit(): void {
		
	}

  operateSideDraw() {
    this.drawn = "sidenav.open()";
    this.onDrawn.emit(this.drawn);
  }

}