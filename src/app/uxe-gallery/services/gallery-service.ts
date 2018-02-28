import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Store,
} from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  ClearToolbars,
  SetAnimationState,
  SetCanvasSource,
  SetCanvasState,
  SetDetailState,
  SetModalState,
  SetToolbarState,
  SetTopbarType,
  UpdateHiddenItem,
  UpdateSelectedItem,
} from '../actions/uxe-gallery.actions';
import { ItemAnimationsService } from '../containers/uxe-animation-portal/item.animations';
import {
  State,
} from '../reducers/uxe-gallery.reducer';
import { PositionalService } from './positional-service';


/**
 * @description A helper Injectable for managing scenarios of state change.
 */
@Injectable()
export class UxeGalleryStateService {
  /**
   * @param {Store<State>} store Ngrx store Service.
   * @param {Router} router Angular Router Service.
   * @param {ItemAnimationsService} animationService ItemAniamtion Service.
   * @param {PositionalService} posService UxeGallery positional service.
   */
  constructor(private store: Store<State>,
              private router: Router,
              private animationService: ItemAnimationsService,
              private posService: PositionalService) {
  }

  /**
   * Will change state of selected Item.
   * @param {number} item
   */
  public setSelectedItem(item: number): void {
    this.store.dispatch(new UpdateSelectedItem({item}));
  }

  /**
   * Select and set a Toolbar property of Store.
   * @param {string} propName Toolbar propername to select from state.
   * @param {boolean} isActive Use to set the value of of state selected.
   */
  public setToolBarStateByName(propName: string, isActive: boolean): void {
    this.store.dispatch(new SetToolbarState({propName: propName, isActive: isActive}));
  }

  /**
   * Selects and sets Overlay/modalState.
   * @param {boolean} isActive
   */
  public setModalState(isActive: boolean): void {
    this.store.dispatch(new SetModalState({isActive: isActive}));
  }

  /**
   * Selects and sets Detailview state.
   * @param {boolean} isActive
   */
  public setDetailState(isActive: boolean): void {
    this.store.dispatch(new SetDetailState({isActive: isActive}));
  }

  /**
   * Sets tempalate type of topbar.
   * @param {string} type
   */
  public setTopbarType(type: string): void {
    this.store.dispatch(new SetTopbarType({type: type}));
  }

  /**
   * Sets Animation state.
   * @param {string} type
   */
  public setAnimationState(type: string): void {
    this.store.dispatch(new SetAnimationState({type: type}));
  }

  /**
   * Sets Brush toolbar state state.
   * @param {string} type Type of white or black.
   */
  public toggleBrush(toggler: boolean): void {
    this.setToolBarStateByName('brushbarTemplate', toggler);
  }



  public openDetailView(item: number) {
    this.setSelectedItem(item);
    this.setModalState(true);
    this.setDetailState(true);
    this.setTopbarType('black');
    this.setToolBarStateByName('topbarTemplate', true);
    this.setToolBarStateByName('bottombarTemplate', true);
    this.setToolBarStateByName('brushbarTemplate', false);
    this.setAnimationState('open');
  }

  public closeDetailView() {
    this.router.navigate(['/demo'])
    this.setSelectedItem(null);
    this.setModalState(false);
    this.setDetailState(false);
    this.setTopbarType('white');
    this.setToolBarStateByName('topbarTemplate', true);
    this.setToolBarStateByName('bottombarTemplate', false);
    this.setToolBarStateByName('brushbarTemplate', false);
    console.log('closinggg')
    this.setAnimationState('closed');
    this.animationService.endAnimate();
  }

  public tappedBars(toggler) {
    this.setToolBarStateByName('topbarTemplate', toggler);
    this.setToolBarStateByName('bottombarTemplate', toggler);
  }

  public home() {
    this.router.navigate([`demo`]);
  }


}
