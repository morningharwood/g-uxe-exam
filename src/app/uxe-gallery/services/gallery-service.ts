import { Injectable } from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import {
  ClearToolbars,
  SetModalState,
  SetToolbarState,
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

  public setToolBarStateByName(propName: string, isActive: boolean): void {
    this.store.dispatch(new SetToolbarState({propName: propName, isActive: isActive}));
  }


  public setModalState(isActive: boolean): void {
    this.store.dispatch(new SetModalState({isActive: isActive}));
  }
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
