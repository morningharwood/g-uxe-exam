import { ModuleWithProviders } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { DoggoResolve } from '../backend-tipe/doggo/doggo-guard.service';
import { UxeGalleryDetailComponent } from '../uxe-gallery/containers/uxe-gallery-detail/uxe-gallery-detail.component';
import { GxeDemoComponent } from './demo/demo.component';
import { GxeDocumentationComponent } from './documentation/documentation.component';
import { IntroComponent } from './intro/intro.component';
import { CanActivatePassword } from './password.guard';
import { GxeProcessComponent } from './process/process.component';
import { CanActivateGallery } from './route.guard';


export const AllRoutes = {
  ROOT: '',
  INTRO: 'intro',
  DEMO: 'demo',
  DETAIL: 'detail',
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
    canActivate: [ CanActivatePassword ],
    children: [
      {
        path: AllRoutes.ROOT,
        component: IntroComponent,
        canActivate: [ CanActivatePassword ],
      },
    ],
  },
  {
    path: AllRoutes.DEMO,
    children: [
      {
        path: AllRoutes.ROOT,
        component: GxeDemoComponent,
        canActivate: [ CanActivatePassword ],
        children: [
          {
            path: AllRoutes.DETAIL,
            component: UxeGalleryDetailComponent,
            canActivate: [CanActivateGallery, CanActivatePassword],
            resolve: {
              data: DoggoResolve
            },
          },
        ]
      },
    ],
  },
  {
    path: AllRoutes.DOCUMENTATION,
    children: [
      {
        path:  AllRoutes.ROOT,
        component: GxeDocumentationComponent,
        canActivate: [ CanActivatePassword ],
      },
    ],
  },
  {
    path: AllRoutes.PROCESS,
    children: [
      {
        path:  AllRoutes.ROOT,
        component: GxeProcessComponent,
        canActivate: [ CanActivatePassword ],
      },
    ],
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(config);
