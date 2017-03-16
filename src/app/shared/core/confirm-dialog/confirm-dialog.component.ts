import { Component, Input, EventEmitter } from '@angular/core';
import { MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
    selector: 'confirm-dialog',
    template: `
        <p>{{ title }}</p>
        <p>{{ message }}</p>
        <button type="button" md-raised-button 
            (click)="dialogRef.close(true)">OK</button>
        <button type="button" md-button 
            (click)="dialogRef.close()">Cancel</button>
    `,
})
export class ConfirmDialogComponent {

    public title: string;
    public message: string;

    constructor(
        public dialogRef: MdDialogRef<ConfirmDialogComponent>,
        public snackBar: MdSnackBar
        ) {}

}