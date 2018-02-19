import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SwipeVerticalService } from '../services/swipe-vertical.service';
import { WindowScrolling } from '../services/window-scroll.service';
import { ItemComponent } from './components/detail/detail-item.component';
import { GalleryItemComponent } from './components/master/master-item.component';
import { GalleryDetailComponent } from './components/detail/detail.component';
import { GalleryMasterComponent } from './components/master/master.component';


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
