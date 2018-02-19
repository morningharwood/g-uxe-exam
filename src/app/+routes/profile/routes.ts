import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterProfileContainerComponent } from './containers/master/component';
import { ResumeContainerComponent } from './containers/resume/component';

export const config: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: 'resume',
        component: ResumeContainerComponent,
      },
      {
        path: '',
        component: MasterProfileContainerComponent,
        children: [
          {
            path: '',
            component: ResumeContainerComponent,
            outlet: 'resume'
          },
        ]
      },
    ],
  },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(config);
