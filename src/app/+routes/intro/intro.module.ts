/**
 * @fileoverview A router outlet module for intro page.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GxeGalleryModule } from '../../gxe-gallery/gxe-gallery.module';
import { DoggoModule } from '../../services/doggo/doggo.module';
import { IntroComponent } from './intro.component';

export const DECLARATIONS_EXPORTS = [IntroComponent]

@NgModule({
  imports: [
    CommonModule,
    GxeGalleryModule,
    DoggoModule,
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS]
})
export class GxeIntroModule { }
