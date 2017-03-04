import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoaderComponent } from './loader';

@NgModule({
  imports: [
    FormsModule,
    HttpModule
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [

  ]
})

export class CoreModule {

}
