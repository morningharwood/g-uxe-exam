

import { Action } from '@ngrx/store';

export interface VideoBlock {
  ytId: string;
}


export const UPDATE  = '[VideoBlock] Update';
export const CLEAR = '[VideoBlock] Clear';

export class Update implements Action {
  public readonly type = UPDATE;
  constructor(public payload: {data: any}) { }
}

export class Clear implements Action {
  public readonly type = CLEAR;
  constructor(public payload?: {}) { }
}
export type Types = Update | Clear;


export function videoReducer(state: any, action: Types) {
  switch (action.type) {
    case UPDATE:
      return { state, ...action.payload};
    case CLEAR:
      return {state, ...action.payload};
    default:
      return state;
  }
}

export const selectFeature = (state: any) => state.profile;
