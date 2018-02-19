import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemComponent } from './components/detail/detail-item.component';
import { GalleryDetailComponent } from './components/detail/detail.component';
import { GalleryItemComponent } from './components/master/master-item.component';
import { GalleryMasterComponent } from './components/master/master.component';
import { ToolbarsComponent } from './components/toolbars/toolbars.component';
import { SwipeVerticalService } from './services/swipe-vertical.service';
import { WindowScrolling } from './services/window-scroll.service';
import { MatToolbarModule } from '@angular/material/toolbar';


const DECLARATIONS_EXPORTS = [
  GalleryMasterComponent,
  GalleryDetailComponent,
  ItemComponent,
  GalleryItemComponent,
  ToolbarsComponent,
];

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
  ],
  providers: [
    WindowScrolling,
    SwipeVerticalService,
  ],
  declarations: [ ...DECLARATIONS_EXPORTS ],
  exports: [ ...DECLARATIONS_EXPORTS ],
})
export class GxeGalleryModule {
}
