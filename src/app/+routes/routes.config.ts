import { ModuleWithProviders } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { GxeDemoComponent } from './demo/demo.component';
import { GxeDocumentationComponent } from './documentation/documentation.component';
import { IntroComponent } from './intro/intro.component';


export const AllRoutes = {
  ROOT: '',
  INTRO: 'intro',
  DEMO: 'demo',
  DOCUMENTATION: 'documentation',
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
      },
    ],
  },
  {
    path: AllRoutes.DEMO,
    children: [
      {
        path: AllRoutes.ROOT,
        component: GxeDemoComponent,
      },
    ],
  },
  {
    path: AllRoutes.DOCUMENTATION,
    children: [
      {
        path:  AllRoutes.ROOT,
        component: GxeDocumentationComponent,
      },
    ],
  },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(config);
