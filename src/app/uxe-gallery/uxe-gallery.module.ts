import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BottombarAuxComponent } from './components/bottombar-aux/bottombar-aux.component';
import { BottombarComponent } from './components/bottombar/bottombar.component';
import { DetailItemComponent } from './components/detail-item/detail-item.component';
import { ItemComponent } from './components/item/item.component';
import { OverlayComponent } from './components/overlay/overlay.component';
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
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('uxeGallery', fromUxeGallery.reducer),
    EffectsModule.forFeature([ UxeGalleryEffects ]),
    RouterModule,
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
    UxeGalleryStateService
  ]
})
export class UxeGalleryModule {
}
