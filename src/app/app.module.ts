import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { FileUploadModule } from 'ng2-file-upload';

import { CoreModule } from './shared/core/core.module';

import { rootRouterConfig } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import {HeaderComponent} from './header';
import { LoginComponent } from './login';
import { CreateTaskComponent } from './create-task';
import { UpdateTaskComponent } from './update-task';
import { InTasksComponent } from './in-tasks';
import { OutTasksComponent } from './out-tasks';


import { TaskSearchService } from './shared/task-search.service';
import { TaskService } from './shared/task.service';
import { AuthService } from './shared/auth.service';
import { DialogsService } from './shared/core/dialogs.service';

import { ConfirmDialog }   from './shared/core/confirm.dialog';
import { CreateDialog } from './shared/core/create.dialog';
import { UpdateDialog } from './shared/core/update.dialog';
import { ProfileComponent } from './profile';

import { AuthGuard } from './shared/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    rootRouterConfig,
    MaterialModule,
    FileUploadModule,
    CoreModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    HeaderComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ConfirmDialog,
    CreateDialog,
    UpdateDialog,
    InTasksComponent,
    OutTasksComponent,
    ProfileComponent
  ],
  entryComponents:[
    CreateTaskComponent,
    UpdateTaskComponent,
    ConfirmDialog,
    CreateDialog,
    UpdateDialog
  ],
  providers: [
    TaskSearchService,
    TaskService,
    AuthService,
    AuthGuard,
    DialogsService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {

}
