import { ModuleWithProviders } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { GxeDemoComponent } from './demo/demo.component';
import { GxeDocumentationComponent } from './documentation/documentation.component';
import { IntroComponent } from './intro/intro.component';
import { GxeProcessComponent } from './process/process.component';
import { AdminGuard } from '../_other/core';


export const AllRoutes = {
  ROOT: '',
  INTRO: 'intro',
  DEMO: 'demo',
  DOCUMENTATION: 'documentation',
  PROCESS: 'process',
};


export const config: Routes = [
  {
    path: AllRoutes.ROOT,
    pathMatch: 'full',
    redirectTo: AllRoutes.INTRO,
  },
  {
    path: AllRoutes.INTRO,
    children: [
      {
        path: AllRoutes.ROOT,
        component: IntroComponent,
        canActivate: [ AdminGuard ],
      },
    ],
  },
  {
    path: AllRoutes.DEMO,
    children: [
      {
        path: AllRoutes.ROOT,
        component: GxeDemoComponent,
        canActivate: [ AdminGuard ],
      },
    ],
  },
  {
    path: AllRoutes.DOCUMENTATION,
    children: [
      {
        path:  AllRoutes.ROOT,
        component: GxeDocumentationComponent,
        canActivate: [ AdminGuard ],
      },
    ],
  },
  {
    path: AllRoutes.PROCESS,
    children: [
      {
        path:  AllRoutes.ROOT,
        component: GxeProcessComponent,
        canActivate: [ AdminGuard ],
      },
    ],
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(config);
