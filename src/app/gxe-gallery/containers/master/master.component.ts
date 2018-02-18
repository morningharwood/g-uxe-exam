import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SwipeVerticalService } from '../../../services/swipe-vertical.service';
import { WindowScrolling } from '../../../services/window-scroll.service';
import { CurrentItem } from '../../interfaces/current-item.interface';
import { Vector2 } from '../../interfaces/vector2.interface';


export const STANDARD_EASE = '250ms cubic-bezier(.35, 0, .25, 1)';


@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  @ViewChildren('masterItem') public masterItems: ElementRef[];
  @ViewChild('masterItemContainer') public masterItemContainer: ElementRef;
  @Input() public galleryItems: any[];
  public isActive: boolean;
  public currentItem: CurrentItem;

  private to: Vector2;
  private playerStart: AnimationPlayer;
  private playerEnd: AnimationPlayer;
  private playerEndOrigin: Vector2;
  private playerParentEnd: AnimationPlayer;


  constructor(private builder: AnimationBuilder,
              private scrollService: WindowScrolling,
              private swipeService: SwipeVerticalService) {
  }

  public ngOnInit(): void {
    this.isActive = false;
    this.playerEndOrigin = {
      x: 0,
      y: 0,
    };
  }


  private set isActive_(val) {
    this.isActive = val;
    this.setBodyScroll();
  }

  public setOrigin($event: number): void {
    const data = this.masterItems[ '_results' ][ $event ].hostEl.nativeElement.getBoundingClientRect();

    this.playerEndOrigin = {
      x: data.x - this.currentItem.x,
      y: data.y - this.currentItem.y,
    };
  }

  public close(swipeEvent): void {
    if (swipeEvent) {
      this.swipeService.swipeOff();
    }

    this.isActive_ = false;
    this.itemAnimateBack({ x: 0, y: 0 }, this.currentItem.mask, 1);
    const notEmpty = Object.entries(this.playerEndOrigin).some(([ key, val ]) => Boolean(val));
    if (notEmpty) {
      this.itemHostAnimate(this.playerEndOrigin, this.currentItem.hostEl);
    }
  }

  public selectedItem($event): void {
    this.to = {
      x: 0,
      y: (window.outerHeight - ($event.hostEl.offsetHeight * 2)) / 2,
    };

    this.currentItem = $event;
    this.isActive_ = true;
    this.itemAnimate($event, this.to, this.currentItem.mask, 2);
  }

  private itemAnimate(from, to, el, scale): void {

    this.playerStart = this.builder.build([
      style({
        transformOrigin: `${from.x}px ${from.y}px`,
      }),
      animate(
        STANDARD_EASE,
        style({
          transform: `translate(${to.x}px, ${to.y}px) scale(${scale})`,
        }),
      ),
    ]).create(el);

    this.playerStart.play();

    this.playerStart.onDone(() => {
      this.playerStart.pause();
    });
  }

  private itemAnimateBack(to, el, scale): void {
    this.playerEnd = this.builder.build([
      animate(
        STANDARD_EASE,
        style({
          transform: `translate(${to.x}px, ${to.y}px) scale(${scale})`,
        }),
      ),
    ]).create(el);

    this.playerEnd.play();

    this.playerEnd.onDone(() => {
      this.clearAllAnimations();
    });
  }

  private itemHostAnimate(to, el): void {
    this.playerParentEnd = this.builder.build([
      animate(
        STANDARD_EASE,
        style({
          transform: `translate(${to.x}px, ${to.y}px)`,
        }),
      ),
    ]).create(el);

    this.playerParentEnd.play();

    this.playerParentEnd.onDone(() => {
      this.clearAllAnimations();
    });
  }

  private clearAllAnimations(): void {
    this.currentItem = null;

    if (this.playerStart) {
      this.playerStart.destroy();
      this.playerStart = null;
    }
    if (this.playerEnd) {
      this.playerEnd.destroy();
      this.playerEnd = null;
    }


    if (this.playerParentEnd) {
      this.playerParentEnd.destroy();
      this.playerParentEnd = null;
    }
  }

  private setBodyScroll() {
    this.isActive ? this.scrollService.disable() : this.scrollService.enable();
  }
}
