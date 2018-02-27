/**
 * App module.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  ActionReducerMap,
  StoreModule,
} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { GxeRouterModule } from './+routes/routes.module';
import { MhFirestoreClientModule } from './_other/firestore/mh-client.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { DoggoModule } from './backend-tipe/doggo/doggo.module';
import {
  metaReducers,
  reducers,
} from './reducers';
import * as fromUxeGallery from './uxe-gallery/reducers/uxe-gallery.reducer';
import { UxeGalleryModule } from './uxe-gallery/uxe-gallery.module';
import { ItemComponent } from './uxe-gallery/components/item/item.component';

declare module '@ngrx/store' {
  interface Action {
    type: string;
    payload?: any;
  }
}

@NgModule({
  imports: [
    AngularFireAuthModule,
    MhFirestoreClientModule.forRoot(),
    BrowserModule,
    GxeRouterModule.forRoot(), // this yo boi.
    DoggoModule.forRoot(), // Backend service to fetch data
    RouterModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([ AppEffects ]),
    StoreModule.forFeature('uxeGallery', fromUxeGallery.reducer),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [ItemComponent],
})
export class AppModule {
}
