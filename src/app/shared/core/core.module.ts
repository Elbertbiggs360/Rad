import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';
import { FeedLoaderComponent } from './feed-loader.component';
import { NoTasksComponent } from './notasks.component';

import { DialogsService } from './confirm-dialog';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    LoaderComponent,
    FeedLoaderComponent,
    NoTasksComponent
  ],
  exports: [
    LoaderComponent,
    FeedLoaderComponent,
    NoTasksComponent
  ],
  providers: [
    DialogsService
  ]
})

export class CoreModule {

}
