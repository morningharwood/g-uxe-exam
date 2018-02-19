import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MhPipesModule } from '../../../_other/pipe/module';
import { CarouselItemComponent } from './carousel/item/component';
import { CarouselListComponent } from './carousel/list/component';
import { FabButtonComponent } from './fab-button/component';
import { StandardRichComponent } from './rich-list/component';
import { StandardBlockComponent } from './standard-block/component';
import { DisclaimerComponent } from './standard-block/disclaimer';
import { TitleComponent } from './standard-block/title/component';
import { StandardListComponent } from './standard-list/component';
import { StandardTableComponent } from './standard-table/component';
import { videoReducer } from './video-block/actions/index';
import { VideoBlockComponent } from './video-block/component';
import { VisitedListComponent } from './visited-list/component';

export const DECLARE_EXPORT = [
  StandardBlockComponent,
  DisclaimerComponent,
  StandardListComponent,
  StandardTableComponent,
  StandardRichComponent,
  CarouselListComponent,
  CarouselItemComponent,
  VideoBlockComponent,
  TitleComponent,
  VisitedListComponent,
  FabButtonComponent,
];

@NgModule({
  declarations: [...DECLARE_EXPORT ],
  exports: [...DECLARE_EXPORT],
  imports: [
      CommonModule,
      MhPipesModule,
      BrowserAnimationsModule,
      StoreModule.forFeature('profile', videoReducer),
  ],
})
export class ProfileComponentsModule {
}

