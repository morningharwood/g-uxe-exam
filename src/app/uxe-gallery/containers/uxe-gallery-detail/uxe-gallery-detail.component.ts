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
import { CanActivateGallery } from '../../../+routes/route.guard';
import { CanActivatePassword } from '../../../+routes/password.guard';
import { AllRoutes } from '../../../+routes/routes.config';
import { DoggoResolve } from '../../../backend-tipe/doggo/doggo-guard.service';


const TOUCH_THRESHOLD = .75;

/**
 * @description A full bleed overlay that takes a
 * dataset and can paginate over data.
 *
 * @howToUse <uxe-gallery-detail></uxe-gallery-detail>
 * Data is passed in via routerguard under the name: 'data'
 * @example
 * Router config:
 *
 *  component: UxeGalleryDetailComponent,
 *  resolve: {
 *    data: DoggoResolve
 *  },
 */
@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: [ './uxe-gallery-detail.component.scss' ],
})
export class UxeGalleryDetailComponent implements OnInit, OnDestroy {
  /**
   * Select the inner container to be panned in the template via ngStyle.
   */
  @ViewChild('containerEl') public container: ElementRef;

  /**
   * Native host element.
   */
  public hostEl: HTMLElement;
  /**
   * Current px position of the @ViewChild('containerEl')
   */
  public currentPosition: number;

  /**
   * Opening animation player of pagination.
   */
  private player: AnimationPlayer;

  /**
   * Cache of the last position when paginating.
   */
  private lastPosition: number;

  /**
   * A subscription to pagination completion which will set off Animations.
   */
  private onPaginationSubscription: Subscription;

  /**
   * A subscription onLoad to paginate deeply to any item with a seamless ease.
   */
  private onLoadSubscription: Subscription;

  /**
   * Local state to keep track of user tap.
   */
  private tapped: boolean;

  /**
   * Gallery Items passed in via router.
   */
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

  /**
   * Init component state & interactions.
   */
  public ngOnInit(): void {
    this.setGalleryData();
    this.setNativeElements();
    this.initLocalState();
    this.createSubscriptionForPagination();
    this.turnOnVerticalSwipe();
  }

  /**
   * Tear down component state & interactions.
   */
  public ngOnDestroy(): void {
    this.onPaginationSubscription.unsubscribe();
    this.onLoadSubscription.unsubscribe();
    this.swipeService.swipeOff();
  }

  /**
   * On tap of gallery emit an event to store.
   * Used to toggle toolbars on and off.
   */
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

  /**
   * DOM selection the angular way.
   */
  private setNativeElements() {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
  }

  /**
   * Set data from router snapshot.
   */
  private setGalleryData() {
    this.galleryItems = this.route.snapshot.data[ 'data' ];
  }

  /**
   * Init local state of pagination and tapped state.
   */
  private initLocalState() {
    this.currentPosition = 0;
    this.lastPosition = 0;
    this.tapped = true;
  }

  /**
   * Creates subscriptions for pagination on init and there after.
   */
  private createSubscriptionForPagination() {
    /**
     * Trigger for initial animation and never again.
     */
    this.onLoadSubscription = this.store.pipe(
      select(selectFeatureExtended),
      map((d) => d.selectedItem),
      take(1),
    ).subscribe((selectedItem) => {
      this.paginationAnimate(selectedItem, SEAMLESS_EASE);
    });

    /**
     * Trigger after initial animation and thereafter.
     */
    this.onPaginationSubscription = this.store.pipe(
      select(selectFeatureExtended),
      map((d) => d.selectedItem),
      bufferCount(2, 1),
    ).subscribe((selectedItem) => {
      if (selectedItem.length > 1) {
        this.paginationAnimate(selectedItem[ 1 ], STANDARD_EASE);
      }
    });
  }
}
