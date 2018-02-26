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
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';
import { EventType } from '../../../gxe-gallery/enums/event-types';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { DATA } from '../uxe-gallery-master/uxe-gallery-master.component';
const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: ['./uxe-gallery-detail.component.scss']
})
export class UxeGalleryDetailComponent implements OnInit {
  public data = DATA;
  public hostEl: any;
  @ViewChild('containerEl') private container: any;
  private player: AnimationPlayer;

  constructor(
    private builder: AnimationBuilder,
    private store: Store<any>,
    public ngHostEl: ElementRef,
    private renderer: Renderer2,
    private galleryService: UxeGalleryStateService) { }
    public currentPosition: number;
    private lastPosition: number;

  ngOnInit() {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
    this.lastPosition = 0;
    this.currentPosition = 0;
    this.setUpBars();
  }

  @HostListener(EventType.CLICK, ['$event'])
  public taptap($event) {
    console.log('tap');
    // this.tapped.emit($event);
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
   * Paginates the gallery.
   */
  private paginate(event: any): void {
    const threshold = event.deltaX / 100;
    const previous = threshold >= TOUCH_THRESHOLD;
    const next = threshold <= -TOUCH_THRESHOLD;
    const offset = Math.abs(this.currentPosition / this.hostEl.offsetWidth);
    console.log(offset);
    let index = Math.round(offset);

    if (previous) {
      index = Math.max(0, Math.floor(offset));
    } else if (next) {
      index = Math.min(Math.ceil(offset), this.data.length - 1);
    }

    this.paginationAnimate(index);
  }

  /**
   * Animates the Pagination of the gallery.
   */
  public paginationAnimate(index: number, timing = STANDARD_EASE) {
    console.log(this.hostEl.offsetWidth, this.currentPosition, index);
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
      this.player.destroy();
      this.lastPosition = this.currentPosition = futurePosition;
      this.player = null;
      // this.endingIndex.emit(index);
    });
  }

  private setUpBars() {
    this.galleryService.setTopbarType('black');
  }
}
