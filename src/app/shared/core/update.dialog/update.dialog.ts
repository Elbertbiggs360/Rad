import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <update-task></update-task>
    <div class="u-padding-24 u-marginTop10 u-floatRight">
      <button (click)=dialogRef.close(false) md-button color="primary">Cancel</button>
      <button (click)=dialogRef.close(true) md-raised-button color="primary"><md-icon>done</md-icon></button>
    </div>
    `,
})
export class UpdateDialog {

  constructor(
    public dialogRef: MdDialogRef<UpdateDialog>
    ) {}

}