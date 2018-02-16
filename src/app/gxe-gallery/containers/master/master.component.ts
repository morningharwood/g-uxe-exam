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
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { EventType } from '../../../_libs/event-types';


export interface GalleryItem {
  id: string;
  title: string;
  imgSrc: string;
}

const mockGalleryItems: GalleryItem[] = [
  { id: '1', title: 'item1', imgSrc: 'xx' },
  { id: '2', title: 'item2', imgSrc: 'xx' },
  { id: '3', title: 'item3', imgSrc: 'xx' },
  { id: '4', title: 'item4', imgSrc: 'xx' },
  { id: '5', title: 'item5', imgSrc: 'xx' },
  { id: '6', title: 'item6', imgSrc: 'xx' },
];

const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  @ViewChild('gxeGalleryInnerContainer')
  private galleryInnerContainer: ElementRef;
  private lastPosition = 0;

  public galleryItems: GalleryItem[] = mockGalleryItems;
  public currentPosition: number;
  public player: AnimationPlayer;

  constructor(private store: Store<any>,
              private el: ElementRef,
              private builder: AnimationBuilder) {
  }

  public ngOnInit(): void {

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

  public paginationAnimate(futurePosition: number) {
    futurePosition = -(futurePosition * this.el.nativeElement.offsetWidth);
    this.player = this.builder.build([
      style({
        transform: `translateX(${this.currentPosition}px)`,
      }),
      animate(
        '350ms cubic-bezier(.35, 0, .25, 1)',
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
