import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';


interface EventDelta {
  x: number;
  y: number;
}

interface NativeElementSize {
  w: number;
  h: number;
}

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

@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit, AfterViewChecked {
  @ViewChild('gxeGalleryInnerContainer')
  private galleryInnerContainer: ElementRef;

  private hostSize: NativeElementSize;
  public galleryItems: GalleryItem[] = mockGalleryItems;
  public currentPosition: number;
  public totalContainerWidth: number;
  public lastPosition = 0;
  public player: AnimationPlayer;

  constructor(private store: Store<any>,
              private el: ElementRef,
              private builder: AnimationBuilder) {
  }

  public ngOnInit(): void {

  }

  public ngAfterViewChecked(): void {
    this.hostSize = {
      w: this.el.nativeElement.offsetWidth,
      h: this.el.nativeElement.offsetHeight,
    };

    this.totalContainerWidth = this.galleryItems.length * this.hostSize.w;
  }

  @HostListener('panmove', [ '$event' ])
  public move(event: any): void {
    if (this.player && this.player.hasStarted) return;
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  @HostListener('panend', [ '$event' ])
  public end(event: any): void {
    if (this.player && this.player.hasStarted) return;
    this.paginate(event);
  }

  private paginate(event: any) {
    const threshold = event.deltaX / 100;
    const offset = this.currentPosition / this.hostSize.w;
    if (threshold >= 0.25) {
      const index = Math.floor(Math.abs(offset));
      this.paginationAnimate(Math.max(0, index));
    } else if (threshold <= -0.25) {
      const index = Math.ceil(Math.abs(offset));
      this.paginationAnimate(Math.min(index, this.galleryItems.length - 1));
    } else {
      this.paginationAnimate(this.lastPosition);
    }
  }

  public paginationAnimate(futurePosition) {
    futurePosition = -(futurePosition * this.hostSize.w);
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
