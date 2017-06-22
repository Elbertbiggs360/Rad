import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <update-task (notifyParent)="closeDialog($event)" [complete]="complete" [activity]="activity" [length]="length" [task_id]="task_id"></update-task>
    `,
})
export class UpdateDialog {

  complete: boolean = false;
  activity: any;
  length: any;
  task_id: string;

  constructor(
    public dialogRef: MdDialogRef<UpdateDialog>
    ) {}

  markAsComplete(){
    this.complete = true;
  }

  closeDialog(evt){
    if(evt==true){
      this.dialogRef.close();
    }
  }

}