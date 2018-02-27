/**
 * @fileoverview Main component controller. Main purpose is to
 * facilitate the passing state between children and animations.
 */
import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../animations/ease.animations';
import { CurrentItem } from '../../interfaces/current-item.interface';
import { Vector2 } from '../../interfaces/vector.interface';
import { SwipeVerticalService } from '../../services/swipe-vertical.service';
import { WindowScrolling } from '../../services/window-scroll.service';
import { GalleryItemComponent } from './master-item.component';


@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  /**
   * Query used to get the whereabouts of the currently selected Gallery uxe-animation-portal.
   */
  @ViewChildren(GalleryItemComponent) public masterItems: QueryList<GalleryItemComponent>;

  /**
   * Input of Gallery Items data.
   */
  @Input() public galleryItems: any[];

  /**
   * Whether Gallery Active (open).
   */
  public isActive: boolean;

  /**
   * Current Selected Gallery Item.
   */
  public currentItem: CurrentItem;

  /**
   * Current Selected Gallery Index.
   */
  public currentIndex: number;

  /**
   * Whether Gallery Item has been tapped.
   */
  public tapped: boolean;

  /**
   * GalleryItem animation position for end state.
   */
  private to: Vector2;

  /**
   * GalleryItem animation origin point.
   */
  private playerEndOrigin: Vector2;

  /**
   * Ending Animation Player.
   */
  private playerEnd: AnimationPlayer;

  /**
   * Ending Parent Animation Player.
   */
  private playerParentEnd: AnimationPlayer;

  /**
   * Starting Animation Player.
   */
  private playerStart: AnimationPlayer;

  /**
   * Starting padding Animation Player.
   */
  private playerPaddingStart: AnimationPlayer;

  /**
   * Gallery host uxe-animation-portal ClientRect State
   */
  private currentSelectedBounds: any;


  constructor(private builder: AnimationBuilder,
              private scrollService: WindowScrolling,
              private swipeService: SwipeVerticalService) {
  }

  /**
   * Zero out state needed on Init.
   */
  public ngOnInit(): void {
    this.tapped = false;
    this.isActive = false;
    this.playerEndOrigin = {
      x: 0,
      y: 0,
    };
  }

  /**
   * Setter to turn off body scroll when isActive is toggled.
   */
  private set isActive_(val) {
    this.isActive = val;
    this.setBodyScroll();
  }

  /**
   * Sets current gallery uxe-animation-portal. Called via output event from children.
   */
  public setCurrentItem($event: number): void {
    this.currentSelectedBounds = this.masterItems[ '_results' ][ $event ].hostEl.nativeElement.getBoundingClientRect();
    this.currentIndex = $event;
    this.playerEndOrigin = {
      x: this.currentSelectedBounds.x - this.currentItem.x,
      y: this.currentSelectedBounds.y - this.currentItem.y,
    };
  }

  /**
   * Close Gallery overlay.
   */
  public close(): void {
    this.swipeService.swipeOff();
    this.resetGalleryState();
    this.closeGalleryDetail();
  }

  /**
   * Queues aniamtion when Gallery uxe-animation-portal is selected from master view.
   */
  public selectedItem($event): void {
    this.to = {
      x: 0,
      y: (window.innerHeight - ($event.hostEl.offsetHeight * 2)) / 2,
    };
    this.currentItem = $event;
    this.openGalleryDetail($event);
  }

  /**
   * Animates Item In
   */
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
  }

  /**
   * Animates Item Out
   */
  private itemAnimateReverse(to, el, scale): void {
    this.playerEnd = this.builder.build([
      animate(
        STANDARD_LEAVE,
        style({
          transform: `translate(${to.x}px, ${to.y}px) scale(${ scale })`,
        }),
      ),
    ]).create(el);
    this.playerEnd.play();
    this.playerEnd.onDone(() => {
      this.clearAllAnimations();
    });
  }

  /**
   * Animates Host Item In.
   */
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

  /**
   * Resets animations.
   */
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

    if (this.playerPaddingStart) {
      this.playerPaddingStart.destroy();
      this.playerPaddingStart = null;
    }
  }

  /**
   * Toggles body scroll.
   */
  private setBodyScroll(): void {
    this.isActive ? this.scrollService.disable() : this.scrollService.enable();
  }

  /**
   * Closes animation and closes gallery detail view.
   */
  private closeGalleryDetail() {
    this.itemAnimateReverse({ x: 0, y: 0 }, this.currentItem.mask, 1);
    if (this.notEmpty()) {
      this.itemHostAnimate(this.playerEndOrigin, this.currentItem.hostEl);
    }
  }

  /**
   * Opening animation and closes gallery detail view.
   */
  private openGalleryDetail($event: any) {
    this.isActive_ = true;
    this.itemAnimate($event, this.to, this.currentItem.mask, 2);
  }

  /**
   * Whether origin has been changed e.g. the detail gallery has been paginated,
   * we will need to set the origin point of the new uxe-animation-portal's origin for smooth
   * animations.
   */
  private notEmpty() {
    return Object.entries(this.playerEndOrigin).some(([ key, val ]) => Boolean(val));
  }

  /**
   * Toggles state of tap.
   */
  public toggleTap(): void {
    this.tapped = !this.tapped;
  }

  /**
   * Resets gallery state.
   */
  private resetGalleryState(): void {
    this.isActive_ = false;
    this.tapped = false;
  }
}
