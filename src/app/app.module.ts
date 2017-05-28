import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { FileUploadModule } from "ng2-file-upload";


import { CoreModule } from './shared/core/core.module';
import { CustomMaterialModule } from './custom-material.module';

import { rootRouterConfig } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import {HeaderComponent} from './header';
import { LoginComponent } from './login';
import { CreateTaskComponent } from './create-task';
import { UpdateTaskComponent } from './update-task';
import { InTasksComponent } from './in-tasks';
import { OutTasksComponent } from './out-tasks';
import { HistoryComponent } from './history';


import { TaskSearchService } from './shared/task-search.service';
import { TaskService } from './shared/task.service';
import { AuthService } from './shared/auth.service';
import { DialogsService } from './shared/core/dialogs.service';

import { ConfirmDialog } from './shared/core/confirm.dialog';
import { CreateDialog } from './shared/core/create.dialog';
import { UpdateDialog } from './shared/core/update.dialog';
import { ProfileComponent } from './profile';

import { AuthGuard } from './shared/auth.guard';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    rootRouterConfig,
    CustomMaterialModule,
    CoreModule,
    FileUploadModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    CreateTaskComponent,
    UpdateTaskComponent,
    ConfirmDialog,
    CreateDialog,
    UpdateDialog,
    InTasksComponent,
    OutTasksComponent,
    ProfileComponent,
    HistoryComponent
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
