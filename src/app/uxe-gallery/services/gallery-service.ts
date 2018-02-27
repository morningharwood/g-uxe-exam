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
import { PositionalService } from '../components/overlay/positional-service';


@Injectable()
export class UxeGalleryStateService {
  private data = new BehaviorSubject('');
  constructor(private store: Store<State>,
              private router: Router,
              private animationService: ItemAnimationsService,
              private posService: PositionalService) {
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

  public setAnimationState(type: string): void {
    this.store.dispatch(new SetAnimationState({type: type}));
  }

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
