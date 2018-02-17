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
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EventType } from '../../../_libs/event-types';
import {
  mockGalleryItems,
  GalleryItem,
} from '../../mock-data';




const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'gxe-gallery-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {
  @Input() public galleryItems: GalleryItem[];
  @Input() public startingIndex: number;
  @ViewChild('gxeGalleryInnerContainer') private galleryInnerContainer: ElementRef;
  private lastPosition = 0;

  public currentPosition = 0;
  public player: AnimationPlayer;

  constructor(private store: Store<any>,
              private el: ElementRef,
              private builder: AnimationBuilder) {
  }

  public ngOnInit(): void {
    console.log(this.startingIndex);
    console.log(this.currentPosition)
    this.paginationAnimate(this.startingIndex, '0ms ease-in');
  }

  @HostListener(EventType.PANMOVE, [ '$event' ])
  public move(event: any): void {
    if (this.isAnimating) {
      return;
    }
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  @HostListener(EventType.PANEND, [ '$event' ])
  public end(event: any): void {
    if (this.isAnimating) {
      return;
    }
    this.paginate(event);
  }

  private get isAnimating(): boolean {
    return !!(this.player && this.player.hasStarted);
  }

  private paginate(event: any): void {
    const threshold = event.deltaX / 100;
    const previous = threshold >= TOUCH_THRESHOLD;
    const next = threshold <= -TOUCH_THRESHOLD;
    const offset = Math.abs(this.currentPosition / this.el.nativeElement.offsetWidth);
    let index = Math.round(offset);

    if (previous) {
      index = Math.max(0, Math.floor(offset));
    } else if (next) {
      index = Math.min(Math.ceil(offset), this.galleryItems.length - 1);
    }

    this.paginationAnimate(index);
  }

  public paginationAnimate(futurePosition: number, timing = '350ms cubic-bezier(.35, 0, .25, 1)') {
    futurePosition = -(futurePosition * this.el.nativeElement.offsetWidth);
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
    });
  }

}
