import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <update-task></update-task>
    <div class="u-padding-24">
      <button (click)=dialogRef.close(true) md-raised-button><md-icon>done</md-icon></button>
      <button (click)=dialogRef.close(false) md-raised-button><md-icon>cancel</md-icon></button>
    </div>
    `,
})
export class UpdateDialog {

  constructor(
    public dialogRef: MdDialogRef<UpdateDialog>
    ) {}

}