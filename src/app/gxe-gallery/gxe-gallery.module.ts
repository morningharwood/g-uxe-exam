import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DoggoService } from '../services/doggo.service';
import { SwipeVerticalService } from '../services/swipe-vertical.service';
import { WindowScrolling } from '../services/window-scroll.service';
import { ItemComponent } from './components/gallery-detail-item/gallery-detail-item.component';
import { GalleryItemComponent } from './components/gallery-master-item/gallery-master-item.component';
import { GalleryDetailComponent } from './containers/detail/detail.component';
import { GalleryMasterComponent } from './containers/master/master.component';
import { GxeGalleryEffects } from './effects/gxe-gallery.effects';
import * as fromGxeGallery from './reducers/gxe-gallery.reducer';


const DECLARATIONS_EXPORTS = [
  GalleryMasterComponent,
  GalleryDetailComponent,
  ItemComponent,
  GalleryItemComponent
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    StoreModule.forFeature('gxeGallery', fromGxeGallery.reducer),
    EffectsModule.forFeature([ GxeGalleryEffects ]),
    HttpClientModule,
  ],
  providers: [
    WindowScrolling,
    SwipeVerticalService,
  ],
  declarations: [ ...DECLARATIONS_EXPORTS, GalleryItemComponent ],
  exports: [ ...DECLARATIONS_EXPORTS ],
})
export class GxeGalleryModule {
}
