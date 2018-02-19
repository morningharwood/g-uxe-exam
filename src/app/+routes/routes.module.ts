import {
  NgModule,
} from '@angular/core';
import { GxeDemoModule } from './demo/demo.module';
import { GxeDocumentationModule } from './documentation/documentation.module';
import { GxeIntroModule } from './intro/intro.module';
import { routes } from './routes.config';



@NgModule({
  imports: [
    GxeIntroModule,
    GxeDocumentationModule,
    GxeDemoModule,
    routes,
  ],
})
export class GxeRouterModule { }
