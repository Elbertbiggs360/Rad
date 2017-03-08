import { NgModule } from '@angular/core'
import { BrowserModule }  from '@angular/platform-browser';

import { LoaderComponent } from './loader.component';
import { NoTasksComponent } from './notasks.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    LoaderComponent,
    NoTasksComponent
  ],
  exports: [
    LoaderComponent,
    NoTasksComponent
  ],
  providers: [

  ]
})

export class CoreModule {

}
