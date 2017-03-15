import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';
import { NoTasksComponent } from './notasks.component';
import { ConfirmDialog }   from './confirm-dialog';

import { DialogsService } from './confirm-dialog';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    LoaderComponent,
    NoTasksComponent,
    ConfirmDialog
  ],
  exports: [
    LoaderComponent,
    NoTasksComponent,
    ConfirmDialog
  ],
  providers: [
    DialogsService
  ]
})

export class CoreModule {

}
