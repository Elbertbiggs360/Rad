import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
    <create-task></create-task>
    `,
})
export class CreateDialog {

    constructor(
        public dialogRef: MdDialogRef<CreateDialog>
        ) {}

}