import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatSliderModule,
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { OverlayService } from './components/overlay/overlay-service';
import { OverlayComponent } from './components/overlay/overlay.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ItemAnimationsService } from './containers/uxe-animation-portal/item.animations';
import { ItemComponent } from './containers/uxe-animation-portal/item.component';
import { UxeGalleryDetailComponent } from './containers/uxe-gallery-detail/uxe-gallery-detail.component';
import { UxeGalleryMasterComponent } from './containers/uxe-gallery-master/uxe-gallery-master.component';
import { UxeGalleryEffects } from './effects/uxe-gallery.effects';
import * as fromUxeGallery from './reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from './services/gallery-service';
import { PositionalService } from './services/positional-service';


const DECLARATIONS_EXPORTS = [
  UxeGalleryMasterComponent,
  UxeGalleryDetailComponent,
  OverlayComponent,
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('uxeGallery', fromUxeGallery.reducer),
    EffectsModule.forFeature([ UxeGalleryEffects ]),
    RouterModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
  ],
  declarations: [
    ...DECLARATIONS_EXPORTS,
    TopbarComponent,
    ItemComponent,
    OverlayComponent,
    BottombarComponent,
    DetailItemComponent,
  ],
  exports: [ ...DECLARATIONS_EXPORTS ],
  providers: [
    OverlayService,
    UxeGalleryStateService,
    PositionalService,
    ItemAnimationsService,
  ],
  entryComponents: [ ItemComponent ],
})
export class UxeGalleryModule {
}
