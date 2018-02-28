import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { UxeGallery } from '../uxe-gallery.model';

/**
 * ENUM used for all actions that could change state of gallery.
 */
export enum UxeGalleryActionTypes {

  /**
   * Extend state Actions for UI and User Interactions !!
   */

  UpdateSelectedItem = '[UxeGallery] Update SelectedItem',
  UpdateHiddenItem = '[UxeGallery] Update HiddenItem',
  ClearToolbars = '[UxeGallery] Clear Toolbars',
  SetToolbarState = '[UxeGallery] Set Toolbars State',
  SetModalState = '[UxeGallery] Set Modal State',
  SetDetailState = '[UxeGallery] Set Detail State',
  SetCanvasState = '[UxeGallery] Set Canvas State',
  SetCanvasSource = '[UxeGallery] Set Canvas Source',
  SetTopbarType = '[UxeGallery] Set Topbar Type',
  SetAnimationState = '[UxeGallery] Set Animation State',


  /**
   * BOILERPLATE
   */
  LoadUxeGallerys = '[UxeGallery] Load UxeGallerys',
  AddUxeGallery = '[UxeGallery] Add UxeGallery',
  UpsertUxeGallery = '[UxeGallery] Upsert UxeGallery',
  AddUxeGallerys = '[UxeGallery] Add UxeGallerys',
  UpsertUxeGallerys = '[UxeGallery] Upsert UxeGallerys',
  UpdateUxeGallery = '[UxeGallery] Update UxeGallery',
  UpdateUxeGallerys = '[UxeGallery] Update UxeGallerys',
  DeleteUxeGallery = '[UxeGallery] Delete UxeGallery',
  DeleteUxeGallerys = '[UxeGallery] Delete UxeGallerys',
  ClearUxeGallerys = '[UxeGallery] Clear UxeGallerys',


}

/**
 * Action for managing state.
 */

/**
 * Updates selected Item in gallery.
 */
export class UpdateSelectedItem implements Action {
  readonly type = UxeGalleryActionTypes.UpdateSelectedItem;
  constructor(public payload: { item: number }) {}
}

/**
 * Hides Item in gallery.
 */
export class UpdateHiddenItem implements Action {
  readonly type = UxeGalleryActionTypes.UpdateHiddenItem;
  constructor(public payload: { id: string }) {}
}

/**
 * Clears toolbars.
 */
export class ClearToolbars implements Action {
  readonly type = UxeGalleryActionTypes.ClearToolbars;
}

/**
 * Sets the toolbar state.
 */
export class SetToolbarState implements Action {
  readonly type = UxeGalleryActionTypes.SetToolbarState;
  constructor(public payload: { propName: string, isActive: boolean }) {}
}

/**
 * Sets the modal state.
 */
export class SetModalState implements Action {
  readonly type = UxeGalleryActionTypes.SetModalState;
  constructor(public payload: { isActive: boolean }) {}
}

/**
 * Sets the detail State
 */
export class SetDetailState implements Action {
  readonly type = UxeGalleryActionTypes.SetDetailState;
  constructor(public payload: { isActive: boolean }) {}
}

/**
 * Set teh Top Tool bar state.
 */
export class SetTopbarType implements Action {
  readonly type = UxeGalleryActionTypes.SetTopbarType;
  constructor(public payload: { type: string }) {}
}

/**
 * Sets the Animation State.
 */
export class SetAnimationState implements Action {
  readonly type = UxeGalleryActionTypes.SetAnimationState;
  constructor(public payload: { type: string }) {}
}


/**
 * BOILERPLATE BELOW
 */


export class SetCanvasState implements Action {
  readonly type = UxeGalleryActionTypes.SetCanvasState;
  constructor(public payload: { isActive: boolean }) {}
}

export class SetCanvasSource implements Action {
  readonly type = UxeGalleryActionTypes.SetCanvasSource;
  constructor(public payload: { source: string }) {}
}

export class ClearUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.ClearUxeGallerys;
}

export class LoadUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.LoadUxeGallerys;

  constructor(public payload: { uxeGallerys: UxeGallery[] }) {}
}

export class AddUxeGallery implements Action {
  readonly type = UxeGalleryActionTypes.AddUxeGallery;

  constructor(public payload: { uxeGallery: UxeGallery }) {}
}

export class UpsertUxeGallery implements Action {
  readonly type = UxeGalleryActionTypes.UpsertUxeGallery;

  constructor(public payload: { uxeGallery: UxeGallery }) {}
}

export class AddUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.AddUxeGallerys;

  constructor(public payload: { uxeGallerys: UxeGallery[] }) {}
}

export class UpsertUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.UpsertUxeGallerys;

  constructor(public payload: { uxeGallerys: UxeGallery[] }) {}
}

export class UpdateUxeGallery implements Action {
  readonly type = UxeGalleryActionTypes.UpdateUxeGallery;

  constructor(public payload: { uxeGallery: Update<UxeGallery> }) {}
}

export class UpdateUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.UpdateUxeGallerys;

  constructor(public payload: { uxeGallerys: Update<UxeGallery>[] }) {}
}

export class DeleteUxeGallery implements Action {
  readonly type = UxeGalleryActionTypes.DeleteUxeGallery;

  constructor(public payload: { id: string }) {}
}

export class DeleteUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.DeleteUxeGallerys;

  constructor(public payload: { ids: string[] }) {}
}



export type UxeGalleryActions =
 LoadUxeGallerys
 | AddUxeGallery
 | UpsertUxeGallery
 | AddUxeGallerys
 | UpsertUxeGallerys
 | UpdateUxeGallery
 | UpdateUxeGallerys
 | DeleteUxeGallery
 | DeleteUxeGallerys
 | ClearUxeGallerys
 | UpdateSelectedItem
 | UpdateHiddenItem
 | ClearToolbars
 | SetToolbarState
 | SetModalState
 | SetDetailState
 | SetCanvasState
 | SetCanvasSource
 | SetTopbarType
 | SetAnimationState;
