import { Injectable } from '@angular/core';
import {
  Store,
} from '@ngrx/store';
import {
  ClearToolbars,
  SetCanvasSource,
  SetCanvasState,
  SetDetailState,
  SetModalState,
  SetToolbarState,
  SetTopbarType,
  UpdateHiddenItem,
  UpdateSelectedItem,
} from '../actions/uxe-gallery.actions';
import {
  State,
} from '../reducers/uxe-gallery.reducer';


@Injectable()
export class UxeGalleryStateService {
  constructor(private store: Store<State>) {
  }

  public setSelectedItem(item: number): void {
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

  public setDetailState(isActive: boolean): void {
    this.store.dispatch(new SetDetailState({isActive: isActive}));
  }

  public setCanvasState(isActive: boolean): void {
    this.store.dispatch(new SetCanvasState({isActive: isActive}));
  }

  public setCanvasSource(source: string): void {
    this.store.dispatch(new SetCanvasSource({source: source}));
  }

  public setTopbarType(type: string): void {
    this.store.dispatch(new SetTopbarType({type: type}));
  }

  public openDetailView(item: number) {
    this.setSelectedItem(item);
    this.setModalState(true);
    this.setDetailState(true);
    this.setTopbarType('black');
    this.setToolBarStateByName('topbarTemplate', true);
    this.setToolBarStateByName('bottombarTemplate', true);
  }
}
