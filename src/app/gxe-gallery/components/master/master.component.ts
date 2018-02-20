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
  @ViewChildren(GalleryItemComponent) public masterItems: QueryList<GalleryItemComponent>;
  @Input() public galleryItems: any[];
  public isActive: boolean;
  public currentItem: CurrentItem;
  public currentIndex: number;
  public tapped: boolean;
  private to: Vector2;
  private playerEnd: AnimationPlayer;
  private playerEndOrigin: Vector2;
  private playerParentEnd: AnimationPlayer;
  private playerStart: AnimationPlayer;
  private playerPaddingStart: AnimationPlayer;


  constructor(private builder: AnimationBuilder,
              private scrollService: WindowScrolling,
              private swipeService: SwipeVerticalService) {
  }

  public ngOnInit(): void {
    this.tapped = false;
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

  public setCurrentItem($event: number): void {
    const data = this.masterItems[ '_results' ][ $event ].hostEl.nativeElement.getBoundingClientRect();

    this.currentIndex = $event;
    this.playerEndOrigin = {
      x: data.x - this.currentItem.x,
      y: data.y - this.currentItem.y,
    };
  }

  public close(): void {
    this.swipeService.swipeOff();
    this.closeGalleryDetail();


    if (this.notEmpty()) {
      this.itemHostAnimate(this.playerEndOrigin, this.currentItem.hostEl);
    }
  }

  public selectedItem($event): void {
    this.to = {
      x: 0,
      y: (window.innerHeight - ($event.hostEl.offsetHeight * 2)) / 2,
    };
    this.currentItem = $event;
    this.openGalleryDetail($event);
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
  }

  private itemAnimateReverse(to, el, scale): void {
    this.playerEnd = this.builder.build([
      animate(
        STANDARD_EASE,
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

    if (this.playerPaddingStart) {
      this.playerPaddingStart.destroy();
      this.playerPaddingStart = null;
    }
  }

  private setBodyScroll(): void {
    this.isActive ? this.scrollService.disable() : this.scrollService.enable();
  }

  private closeGalleryDetail() {
    this.isActive_ = false;
    this.tapped = false;
    this.itemAnimateReverse({ x: 0, y: 0 }, this.currentItem.mask, 1);
  }

  private openGalleryDetail($event: any) {
    this.isActive_ = true;
    this.itemAnimate($event, this.to, this.currentItem.mask, 2);
  }

  private notEmpty() {
    return Object.entries(this.playerEndOrigin).some(([ key, val ]) => Boolean(val));
  }

  public toggleTap(): void {
    console.log('tapped master');
    this.tapped = !this.tapped;
  }
}
