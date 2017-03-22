import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

import { ConfirmDialog } from './confirm.dialog';
import { CreateDialog } from './create.dialog';
import { UpdateDialog } from './update.dialog';

@Injectable()
export class DialogsService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmDialog>;

        dialogRef = this.dialog.open(ConfirmDialog);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }

    public create(): any {
      return this.dialog.open(CreateDialog);
    }

    public update(task_id): any {

        let dialogRef: MdDialogRef<UpdateDialog>;

        dialogRef = this.dialog.open(UpdateDialog);
        dialogRef.componentInstance.task_id = task_id;
      return dialogRef.afterClosed();
    }

}