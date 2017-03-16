import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';
import { FeedLoaderComponent } from './feed-loader.component';
import { NoTasksComponent } from './notasks.component';

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
  ]
})

export class CoreModule {

}
