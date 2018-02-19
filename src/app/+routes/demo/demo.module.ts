import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DoggoModule } from '../../backend-tipe/doggo/doggo.module';
import { GxeGalleryModule } from '../../gxe-gallery/gxe-gallery.module';
import { GxeDemoComponent } from './demo.component';


export const DECLARATIONS_EXPORTS = [GxeDemoComponent];

@NgModule({
  imports: [
    CommonModule,
    GxeGalleryModule,
    DoggoModule,
  ],
  declarations: [...DECLARATIONS_EXPORTS],
  exports: [...DECLARATIONS_EXPORTS],
})
export class GxeDemoModule { }