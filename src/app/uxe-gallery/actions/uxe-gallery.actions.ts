import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { UxeGallery } from '../uxe-gallery.model';

export enum UxeGalleryActionTypes {
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

  // Extend state Actions
  UpdateSelectedItem = '[UxeGallery] Update SelectedItem',
  UpdateHiddenItem = '[UxeGallery] Update HiddenItem',
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

export class ClearUxeGallerys implements Action {
  readonly type = UxeGalleryActionTypes.ClearUxeGallerys;
}

export class UpdateSelectedItem implements Action {
  readonly type = UxeGalleryActionTypes.UpdateSelectedItem;
  constructor(public payload: { item: UxeGallery }) {}
}

export class UpdateHiddenItem implements Action {
  readonly type = UxeGalleryActionTypes.UpdateHiddenItem;
  constructor(public payload: { id: string }) {}
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
 | UpdateHiddenItem;
