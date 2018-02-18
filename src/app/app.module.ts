import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { GxeGalleryModule } from './gxe-gallery/gxe-gallery.module';
import { metaReducers, reducers } from './reducers';
import { DoggoService } from './services/doggo.service';


@NgModule({
  imports: [
    GxeGalleryModule,
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  declarations: [
    AppComponent,

  ],
  providers: [DoggoService],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
