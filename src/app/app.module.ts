import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { CoreModule } from './shared/core/core.module';

import { rootRouterConfig } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import {HeaderComponent} from './header';
import { LoginComponent } from './login';
import { CreateTaskComponent } from './create-task';
import { UpdateTaskComponent } from './update-task';


import { TaskSearchService } from './shared/task-search.service';
import { TaskService } from './shared/task.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    rootRouterConfig,
    MaterialModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    HeaderComponent,
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  entryComponents:[
    CreateTaskComponent,
    UpdateTaskComponent
  ],
  providers: [
    TaskSearchService,
    TaskService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
