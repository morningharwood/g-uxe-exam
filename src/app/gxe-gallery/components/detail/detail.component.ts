/**
 * @fileoverview Detail Component Controller
 * used to paginate horizontally through Gallery items.
 */
import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { STANDARD_EASE } from '../../animations/ease.animations';
import { EventType } from '../../enums/event-types';
import { GalleryItem } from '../../interfaces/gallery-items.interface';


const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'gxe-gallery-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.scss' ],
})
export class GalleryDetailComponent implements OnInit {
  /**
   * When the pagination completes emit endingIndex.
   * Used to setCurrentItem in the parent scopes.
   */
  @Output() public endingIndex: EventEmitter<any> = new EventEmitter();
  /**
   * When gallery item is tapped.  Used in the parent
   * scope to toggle toolbars.
   */
  @Output() public tapped: EventEmitter<any> = new EventEmitter();

  /**
   * Gallery items collection used for pagination inside paginate().
   */
  @Input() public galleryItems: GalleryItem[];

  /**
   * Each item width prefetch for IOS as it webAnimation API was adding
   * Scale into an interim measurement... :(
   */
  @Input() public itemWidth: number;

  /**
   * Whether gallery is currently active.
   */
  @Input() public isActive: boolean;

  /**
   * Starting gallery item index before pagination occurs.
   */
  @Input() public startingIndex: number;

  /**
   * DOM selection of ViewChild for Animations
   */
  @ViewChild('gxeGalleryInnerContainer') private galleryInnerContainer: ElementRef;

  /**
   * Current pan position.
   */
  public currentPosition: number;

  /**
   * Cached or previous pan position.
   */
  private lastPosition: number;

  /**
   * WebAnimationAPI player object.
   */
  private player: AnimationPlayer;

  constructor(private el: ElementRef,
              private builder: AnimationBuilder) {
  }

  /**
   * Set reset State and Set current pagination position.
   */
  public ngOnInit(): void {
    this.lastPosition = 0;
    this.currentPosition = 0;
    this.paginationAnimate(this.startingIndex, '0ms');
  }

  /**
   * On tap of gallery emit an event up scope
   * Used to toggle toolbars on and off.
   */
  @HostListener(EventType.CLICK, ['$event'])
  public taptap($event) {
    this.tapped.emit($event);
  }

  /**
   * Set current position to control free pan.
   * Showcased in the template using [ngStyle].
   */
  @HostListener(EventType.PANMOVE, [ '$event' ])
  public move(event: any): void {
    if (this.isAnimating) return;
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  /**
   * When pan has ended go to proper page.
   */
  @HostListener(EventType.PANEND, [ '$event' ])
  public end(event: any): void {
    if (this.isAnimating) return;
    this.paginate(event);
  }

  /**
   * Whether gallery is currently in animation transition.
   */
  private get isAnimating(): boolean {
    return !!(this.player && this.player.hasStarted);
  }

  /**
   * Paginates the gallery.
   */
  private paginate(event: any): void {
    const threshold = event.deltaX / 100;
    const previous = threshold >= TOUCH_THRESHOLD;
    const next = threshold <= -TOUCH_THRESHOLD;
    const offset = Math.abs(this.currentPosition / this.itemWidth);
    let index = Math.round(offset);

    if (previous) {
      index = Math.max(0, Math.floor(offset));
    } else if (next) {
      index = Math.min(Math.ceil(offset), this.galleryItems.length - 1);
    }

    this.paginationAnimate(index);
  }

  /**
   * Animates the Pagination of the gallery.
   */
  public paginationAnimate(index: number, timing = STANDARD_EASE) {
    const futurePosition = -(index * this.itemWidth);
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
    ]).create(this.galleryInnerContainer.nativeElement);

    this.player.play();

    this.player.onDone(() => {
      this.player.destroy();
      this.lastPosition = this.currentPosition = futurePosition;
      this.player = null;
      this.endingIndex.emit(index);
    });
  }
}
