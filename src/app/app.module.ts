import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GxeGalleryModule } from './gxe-gallery/gxe-gallery.module';
import { DoggoService } from './services/doggo.service';


@NgModule({
  imports: [
    GxeGalleryModule,
    BrowserModule,
  ],
  declarations: [
    AppComponent,

  ],
  providers: [ DoggoService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
