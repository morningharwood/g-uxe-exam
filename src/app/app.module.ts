import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GxeRouterModule } from './+routes/routes.module';
import { AppComponent } from './app.component';
import { DoggoModule } from './services/doggo/doggo.module';



@NgModule({
  imports: [
    BrowserModule,
    GxeRouterModule,
    DoggoModule.forRoot(),
    RouterModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
}
