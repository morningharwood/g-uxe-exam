import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ActionReducerMap,
  StoreModule,
} from '@ngrx/store';
import { GxeRouterModule } from './+routes/routes.module';
import { AppComponent } from './app.component';
import { DoggoModule } from './backend-tipe/doggo/doggo.module';



export const reducers: ActionReducerMap<any> = {
};

@NgModule({
  imports: [
    BrowserModule,
    GxeRouterModule,
    DoggoModule.forRoot(),
    RouterModule,
    StoreModule.forRoot(reducers),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
