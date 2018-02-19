import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MhPipesModule } from '../../_other/pipe/module';
import { ProfileComponentsModule } from './components/module';
import { MasterProfileContainerComponent } from './containers/master/component';
import { ResumeContainerComponent } from './containers/resume/component';
import * as profileRoutes from './routes';

export const DECLARE_EXPORT = [
  ResumeContainerComponent,
  MasterProfileContainerComponent,
];

@NgModule({
  declarations: [...DECLARE_EXPORT],
  exports: [...DECLARE_EXPORT],
  imports: [
    CommonModule,
    MhPipesModule,
    profileRoutes.routes,
    ProfileComponentsModule,
  ],
})
export class ProfileModule {
}

