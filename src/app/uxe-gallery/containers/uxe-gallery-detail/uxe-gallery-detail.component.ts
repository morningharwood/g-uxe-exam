import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {
  bufferCount,
  map,
  take,
} from 'rxjs/operators';
import {
  SEAMLESS_EASE,
  STANDARD_EASE,
} from '../../../gxe-gallery/animations/ease.animations';
import { SwipeVerticalService } from '../../../gxe-gallery/services/swipe-vertical.service';
import { PositionalService } from '../../components/overlay/positional-service';
import { EventType } from '../../enums/event-types';
import { GalleryItem } from '../../interfaces/gallery-items.interface';
import { selectFeatureExtended } from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';


const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: [ './uxe-gallery-detail.component.scss' ],
})
export class UxeGalleryDetailComponent implements OnInit, OnDestroy {
  @ViewChild('containerEl') public container: ElementRef;
  public hostEl: HTMLElement;
  public currentPosition: number;
  private player: AnimationPlayer;
  private lastPosition: number;
  private onPaginationSubscription: Subscription;
  private onLoadSubscription: Subscription;
  private tapped: boolean;
  private galleryItems: GalleryItem[];


  constructor(private builder: AnimationBuilder,
              private store: Store<any>,
              public ngHostEl: ElementRef,
              private renderer: Renderer2,
              private galleryService: UxeGalleryStateService,
              private posService: PositionalService,
              private swipeService: SwipeVerticalService,
              private route: ActivatedRoute) {

  }

  public ngOnInit(): void {
    this.setGalleryData();
    this.setNativeElements();
    this.initLocalState();
    this.createSubscriptionForPagination();
    this.turnOnVerticalSwipe();
  }

  public ngOnDestroy(): void {
    this.onPaginationSubscription.unsubscribe();
    this.onLoadSubscription.unsubscribe();
  }

  @HostListener(EventType.CLICK, [ '$event' ])
  public taptap() {
    this.tapped = !this.tapped;
    this.galleryService.tappedBars(this.tapped);
  }

  /**
   * Set current position to control free pan.
   * Showcased in the template using [ngStyle].
   */
  @HostListener(EventType.PANMOVE, [ '$event' ])
  public move(event: any): void {
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  /**
   * When pan has ended go to proper page.
   */
  @HostListener(EventType.PANEND, [ '$event' ])
  public end(event: any): void {
    this.paginate(event);
  }

  /**
   * Animates the Pagination of the gallery.
   */
  public paginationAnimate(index: number, timing = STANDARD_EASE): void {
    const futurePosition = -(index * this.hostEl.offsetWidth);
    this.player = this.builder.build([
      style({
        transform: `translateX(${this.currentPosition}px)`,
      }),
      animate(
        timing,
        style({
          transform: `translateX(${futurePosition}px)`,
        }),
      ),
    ]).create(this.container.nativeElement);

    this.player.play();
    this.player.onDone(() => {
      if (this.player) {
        this.player.destroy();
        this.player = null;
      }
      this.lastPosition = this.currentPosition = futurePosition;
      this.posService.setMove(index);
    });
  }

  /**
   * Turn on vertical swipe
   */
  private turnOnVerticalSwipe() {
    this.swipeService
      .bootstrap(this.hostEl)
      .on(`${EventType.SWIPEUP} ${EventType.SWIPEDOWN}`,
        () => {
          this.galleryService.closeDetailView();
        });
  }

  /**
   * Paginates the gallery.
   */
  private paginate(event: any): void {
    const threshold = event.deltaX / 100;
    const previous = threshold >= TOUCH_THRESHOLD;
    const next = threshold <= -TOUCH_THRESHOLD;
    const offset = Math.abs(this.currentPosition / this.hostEl.offsetWidth);
    let index = Math.round(offset);

    if (previous) {
      index = Math.max(0, Math.floor(offset));
    } else if (next) {
      index = Math.min(Math.ceil(offset), this.galleryItems.length - 1);
    }

    this.galleryService.setSelectedItem(index);
  }

  private setNativeElements() {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  private setGalleryData() {
    this.galleryItems = this.route.snapshot.data[ 'doggos' ];
  }

  private initLocalState() {
    this.currentPosition = 0;
    this.lastPosition = 0;
    this.tapped = true;
  }

  private createSubscriptionForPagination() {
    this.onPaginationSubscription = this.store.pipe(
      select(selectFeatureExtended),
      map((d) => d.selectedItem),
      bufferCount(2, 1),
    ).subscribe((selectedItem) => {
      console.log(selectedItem);
      if (selectedItem.length > 1) {
        this.paginationAnimate(selectedItem[ 1 ], STANDARD_EASE);
      }
    });

    this.onLoadSubscription = this.store.pipe(
      select(selectFeatureExtended),
      map((d) => d.selectedItem),
      take(1),
    ).subscribe((selectedItem) => {
      this.paginationAnimate(selectedItem, SEAMLESS_EASE);
    });
  }
}
