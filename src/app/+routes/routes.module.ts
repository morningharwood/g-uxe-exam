import {
  NgModule,
} from '@angular/core';
import { GxeAboutModule } from './about/about.module';
import { GxeDemoModule } from './demo/demo.module';
import { GxeDocumentationModule } from './documentation/documentation.module';
import { GxeIntroModule } from './intro/intro.module';
import { routes } from './routes.config';
import { ProfileModule } from './profile/module';



@NgModule({
  imports: [
    GxeIntroModule,
    GxeDocumentationModule,
    GxeAboutModule,
    GxeDemoModule,
    routes,
    ProfileModule,
  ],
})
export class GxeRouterModule { }
