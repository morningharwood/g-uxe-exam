import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GalleryDetailComponent } from './containers/detail/detail.component';
import { GalleryMasterComponent } from './containers/master/master.component';
import { GxeGalleryEffects } from './effects/gxe-gallery.effects';
import * as fromGxeGallery from './reducers/gxe-gallery.reducer';


const DECLARATIONS_EXPORTS = [
  GalleryMasterComponent,
  GalleryDetailComponent,
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    StoreModule.forFeature('gxeGallery', fromGxeGallery.reducer),
    EffectsModule.forFeature([ GxeGalleryEffects ]),
  ],
  declarations: [ ...DECLARATIONS_EXPORTS ],
  exports: [ ...DECLARATIONS_EXPORTS ],
})
export class GxeGalleryModule {
}
