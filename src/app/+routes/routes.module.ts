import {
  NgModule,
} from '@angular/core';
import { GxeDemoModule } from './demo/demo.module';
import { GxeDocumentationModule } from './documentation/documentation.module';
import { GxeIntroModule } from './intro/intro.module';
import { LoginRouteModule } from './login/login.module';
import {
  GxeProcessModule,
} from './process/process.module';
import { ProfileModule } from './profile/module';
import { routes } from './routes.config';



@NgModule({
  imports: [
    GxeIntroModule,
    LoginRouteModule,
    GxeDocumentationModule,
    GxeDemoModule,
    GxeProcessModule,
    routes,
    ProfileModule,
  ],
})
export class GxeRouterModule { }
