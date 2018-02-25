import { Injectable } from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import {
  ClearToolbars,
  UpdateHiddenItem,
  UpdateSelectedItem,
} from '../actions/uxe-gallery.actions';
import {
  State,
} from '../reducers/uxe-gallery.reducer';
import { UxeGallery } from '../uxe-gallery.model';


@Injectable()
export class UxeGalleryStateService {
  constructor(private store: Store<State>) {
  }

  public setSelectedItem(item: UxeGallery): void {
    this.store.dispatch(new UpdateSelectedItem({item}));
  }

  public setHiddenItem(id: string): void {
    this.store.dispatch(new UpdateHiddenItem({id}));
  }

  public clearToolbars(): void {
    this.store.dispatch(new ClearToolbars());
  }

  // public setToolBarVisibility(id: string): void {
  //   this.store.dispatch(new ClearToolBars())
    // stub
    // Store.bottombar = false
    // Store.topbar = false
  // }

  //
  // public setTopbarType(type: any): void {
  //   // stub
  //   // Store.topbarType = type
  // }
  //
  // public setModal(active: boolean): void {
  //   // stub
  //   // Store.modal = active;
  // }
  //
  // public ActivateDetail(): void {
  //   // stub
  //   // Store.detailTemplate = active;
  // }
  //
  // public ActivateCanvas(): void {
  //   // stub
  //   // Store.canvasTemplate = active;
  // }
}
