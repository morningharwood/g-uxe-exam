/**
 * App module.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ActionReducerMap,
  StoreModule,
} from '@ngrx/store';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GxeRouterModule } from './+routes/routes.module';
import { AppComponent } from './app.component';
import { DoggoModule } from './backend-tipe/doggo/doggo.module';
import { MhFirestoreClientModule } from './_other/firestore/mh-client.module';


export const reducers: ActionReducerMap<any> = {
};

@NgModule({
  imports: [
    AngularFireAuthModule,
    MhFirestoreClientModule.forRoot(),
    BrowserModule,
    GxeRouterModule, // this yo boi.
    DoggoModule.forRoot(), // Backend service to fetch data
    RouterModule,
    StoreModule.forRoot(reducers), // state management for profile page.
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
