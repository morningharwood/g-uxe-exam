import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CanActivateGallery } from '../+routes/route.guard';
import { BottombarAuxComponent } from './components/bottombar-aux/bottombar-aux.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { ItemAnimationsService } from './containers/uxe-animation-portal/item.animations';
import { ItemComponent } from './containers/uxe-animation-portal/item.component';
import { OverlayService } from './components/overlay/overlay-service';
import { OverlayComponent } from './components/overlay/overlay.component';
import { PositionalService } from './components/overlay/positional-service';
import { TopbarComponent } from './components/topbar/topbar.component';
import { UxeGalleryCanvasComponent } from './containers/uxe-gallery-canvas/uxe-gallery-canvas.component';
import { UxeGalleryDetailComponent } from './containers/uxe-gallery-detail/uxe-gallery-detail.component';
import { UxeGalleryMasterComponent } from './containers/uxe-gallery-master/uxe-gallery-master.component';
import { UxeGalleryEffects } from './effects/uxe-gallery.effects';
import * as fromUxeGallery from './reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from './services/gallery-service';


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
    MatToolbarModule,
    MatIconModule,
  ],
  declarations: [
    ...DECLARATIONS_EXPORTS,
    TopbarComponent,
    ItemComponent,
    OverlayComponent,
    BottombarComponent,
    BottombarAuxComponent,
    UxeGalleryCanvasComponent,
    DetailItemComponent,
  ],
  exports: [ ...DECLARATIONS_EXPORTS ],
  providers: [
    OverlayService,
    UxeGalleryStateService,
    PositionalService,
    ItemAnimationsService,
  ],
  entryComponents: [ItemComponent],
})
export class UxeGalleryModule {
}
