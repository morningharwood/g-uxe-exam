import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
// import { TopbarType } from '../components/topbar/topbar.interface';
import { UpdateUxeGallery } from '../actions/uxe-gallery.actions';
import { State } from '../reducers/uxe-gallery.reducer';


@Injectable()
export class GalleryStateService {
  constructor(private store: Store<State>) {
  }

  public setSelectedItem(id: string): void {
    // stub
    // this.store.dispatch(new UpdateUxeGallery({});
    // Store.selectedItem = id
    // this.store.dispatch(new UpdateUxeGallery({
    //   uxeGallery: {
    //
    //   }
    // }));
  }

  public setHiddenItem(id: string): void {
    // stub
    // Store.hiddenItem = id
  }


  public setToolBarVisibility(id: string): void {
    // stub
    // Store.bottombar = false
    // Store.topbar = false
  }

  public setTopbarType(type: any): void {
    // stub
    // Store.topbarType = type
  }

  public setModal(active: boolean): void {
    // stub
    // Store.modal = active;
  }

  public ActivateDetail(): void {
    // stub
    // Store.detailTemplate = active;
  }

  public ActivateCanvas(): void {
    // stub
    // Store.canvasTemplate = active;
  }
}
