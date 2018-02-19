import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '../../video-block/actions/index';

@Component({
  selector: 'mh-carousel-item',
  templateUrl: './component.html',
  styleUrls: ['../../shared-styles.scss', './component.scss'],
  animations: [

    trigger('popOverState', [
      state('show', style({
        opacity: 1,
        zIndex: 10,
      })),
      state('hide', style({
        opacity: 0,
        zIndex: -1,
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('600ms ease-in')),
    ]),
  ],
})
export class CarouselItemComponent {
  @Input() public data: any;
  @Input() public index;
  @Input() public active;

  public show = false;

  constructor(private store: Store<any>) {
  }

  public get stateName(): string {
    return this.index === this.active ? 'show' : 'hide';
  }

  @HostListener('click')
  public updateYtId(): void {


    this.store.dispatch(new Update({data: this.data}));
  }
}
