import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <update-task [complete]="complete" [task_id]="task_id"></update-task>
    `,
})
export class UpdateDialog {

  complete: boolean = false;
  task_id: any;

  constructor(
    public dialogRef: MdDialogRef<UpdateDialog>
    ) {}

  markAsComplete(){
    this.complete = true;
  }

}