import { Component, OnInit } from '@angular/core';
// import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import * as fromUxeGallery from '../../reducers/uxe-gallery.reducer';
import { UxeGallery } from '../../uxe-gallery.model';

import {
  select,
  Store,
} from '@ngrx/store';
import { selectAll, selectFeatureExtended, State } from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';

@Component({
  selector: 'uxe-gallery-master',
  templateUrl: './uxe-gallery-master.component.html',
  styleUrls: ['./uxe-gallery-master.component.scss']
})
export class UxeGalleryMasterComponent implements OnInit {
  private obs: Observable<UxeGallery[]>;
  private obsExtended: Observable<any>;

  constructor(
    private store: Store<State>,
    private galleryStateService: UxeGalleryStateService) { }

  ngOnInit() {
    this.obs = this.store.pipe(select(selectAll));
    this.obsExtended = this.store.pipe(select(selectFeatureExtended));

  }

  public selectedItem(item: UxeGallery): void {
    this.galleryStateService.setSelectedItem(item);
  }

  public hiddenItem(id: string): void {
    this.galleryStateService.setHiddenItem(id);
  }

  public clearToolbars(): void {
    this.galleryStateService.clearToolbars();
  }

  public setToolBarStateByName(propName: string, isActive: boolean): void {
    this.galleryStateService
      .setToolBarStateByName(propName, isActive);
  }

  public setModalState(isActive: boolean): void {
    this.galleryStateService.setModalState(isActive);
  }

  public setDetailState(isActive: boolean): void {
    this.galleryStateService.setDetailState(isActive);
  }

  public setCanvasState(isActive: boolean): void {
    this.galleryStateService.setCanvasState(isActive);
  }

  public setCanvasSource(source: string): void {
    this.galleryStateService.setCanvasSource(source);
  }

  public setTopbarType(type: string) {
    this.galleryStateService.setTopbarType(type);
  }
}
