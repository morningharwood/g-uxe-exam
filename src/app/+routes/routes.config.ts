import { ModuleWithProviders } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import { AdminGuard } from '../_other/core';
import { UxeGalleryDetailComponent } from '../uxe-gallery/containers/uxe-gallery-detail/uxe-gallery-detail.component';
import { GxeDemoComponent } from './demo/demo.component';
import { GxeDocumentationComponent } from './documentation/documentation.component';
import { IntroComponent } from './intro/intro.component';
import { GxeProcessComponent } from './process/process.component';


export const AllRoutes = {
  ROOT: '',
  INTRO: 'intro',
  DEMO: 'demo',
  DETAIL: 'detail/:slug',
  CANVAS_BRUSH: 'brush',
  CANVAS_TEXT: 'text',
  CANVAS_MORE: 'more',
  CANVAS_STICKERS: 'stickers',
  CANVAS_SHARE: 'share',
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
        children: [
          {
            path: AllRoutes.DETAIL,
            component: UxeGalleryDetailComponent,
            canActivate: [ AdminGuard ],
            children: [
              {
                path: AllRoutes.CANVAS_BRUSH,
                component: UxeGalleryDetailComponent,
                canActivate: [ AdminGuard ],
              },
              {
                path: AllRoutes.CANVAS_TEXT,
                component: UxeGalleryDetailComponent,
                canActivate: [ AdminGuard ],
              },
              {
                path: AllRoutes.CANVAS_MORE,
                component: UxeGalleryDetailComponent,
                canActivate: [ AdminGuard ],
              },
              {
                path: AllRoutes.CANVAS_STICKERS,
                component: UxeGalleryDetailComponent,
                canActivate: [ AdminGuard ],
              },
              {
                path: AllRoutes.CANVAS_SHARE,
                component: UxeGalleryDetailComponent,
                canActivate: [ AdminGuard ],
              },
            ]
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
