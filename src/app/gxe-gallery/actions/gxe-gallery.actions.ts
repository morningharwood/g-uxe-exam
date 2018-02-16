import { Action } from '@ngrx/store';

export enum GxeGalleryActionTypes {
  GxeGalleryAction = '[GxeGallery] Action'
}

export class GxeGallery implements Action {
  readonly type = GxeGalleryActionTypes.GxeGalleryAction;
}

export type GxeGalleryActions = GxeGallery;
