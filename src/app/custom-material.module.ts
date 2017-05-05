import { NgModule } from '@angular/core';
import {
  MdButtonModule, 
  MdCheckboxModule, 
  MdDialogModule, 
  MdSnackBarModule,
  MdInputModule,
  MdToolbarModule,
  MdProgressBarModule,
  MdIconModule,
  MdChipsModule,
  MdCardModule,
  MdListModule,
  MdMenuModule,
  MdSlideToggleModule,
  MdSliderModule,
  MdSelectModule

} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule, 
    MdCheckboxModule, 
    MdDialogModule,
    MdSnackBarModule,
    MdInputModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdIconModule,
    MdChipsModule,
    MdCardModule,
    MdListModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSelectModule
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule, 
    MdDialogModule,
    MdSnackBarModule,
    MdInputModule,
    MdToolbarModule,
    MdProgressBarModule,
    MdIconModule,
    MdChipsModule,
    MdCardModule,
    MdListModule,
    MdMenuModule,
    MdSlideToggleModule,
    MdSliderModule,
    MdSelectModule
  ]
})
export class CustomMaterialModule { }
