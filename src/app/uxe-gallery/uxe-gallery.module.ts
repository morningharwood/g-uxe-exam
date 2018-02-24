import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UxeGalleryDetailComponent } from './containers/uxe-gallery-detail/uxe-gallery-detail.component';
import { UxeGalleryMasterComponent } from './containers/uxe-gallery-master/uxe-gallery-master.component';
import { UxeGalleryEffects } from './effects/uxe-gallery.effects';
import * as fromUxeGallery from './reducers/uxe-gallery.reducer';


const DECLARATIONS_EXPORTS = [UxeGalleryMasterComponent, UxeGalleryDetailComponent];
@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('uxeGallery', fromUxeGallery.reducer),
    EffectsModule.forFeature([UxeGalleryEffects])
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS],
})
export class UxeGalleryModule { }
