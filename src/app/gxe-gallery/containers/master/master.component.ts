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
  private currentIndex: number;

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
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  @HostListener('panend', [ '$event' ])
  public end(event: any): void {
    this.paginate(event);
  }

  private paginate(event: any) {
    const offset = event.deltaX / 100;
    if (offset >= 0.25) {
      const index = Math.floor(Math.abs(this.currentPosition / this.hostSize.w));
      this.paginationAnimate(-(index * this.hostSize.w));
    } else if (offset <= -0.25) {
      const index = Math.ceil(Math.abs(this.currentPosition / this.hostSize.w));
      this.paginationAnimate(-(Math.min(index, this.galleryItems.length - 1) * this.hostSize.w));
    } else {
      this.paginationAnimate(this.lastPosition);
    }
  }

  public paginationAnimate(futurePosition) {
    this.player  = this.builder.build([
      style({
        transform: `translateX(${this.currentPosition}px)`
      }),
      animate(
        '350ms cubic-bezier(.35, 0, .25, 1)',
        style({
          transform: `translateX(${futurePosition}px)`
        })
      )
    ]).create(this.galleryInnerContainer.nativeElement);

    this.player.play();

    this.player.onDone(() => {
      this.player.destroy();
      this.lastPosition = this.currentPosition = futurePosition;
      this.player = null;
    });
  }

}
