import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <create-task (notifyParent)="closeDialog($event)" ></create-task>
    `,
})
export class CreateDialog {

  constructor(
    public dialogRef: MdDialogRef<CreateDialog>
  ) {}

  closeDialog(evt){
  	if(evt==true){
  		this.dialogRef.close();
  	}
  }

}