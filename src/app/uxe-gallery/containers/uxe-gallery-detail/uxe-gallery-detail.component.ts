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
import {
  select,
  Store,
} from '@ngrx/store';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';
import { EventType } from '../../../gxe-gallery/enums/event-types';
import { selectFeatureExtended } from '../../reducers/uxe-gallery.reducer';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { DATA } from '../uxe-gallery-master/uxe-gallery-master.component';


const TOUCH_THRESHOLD = .75;

@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: [ './uxe-gallery-detail.component.scss' ],
})
export class UxeGalleryDetailComponent implements OnInit {
  public data = DATA;
  public hostEl: any;
  @ViewChild('containerEl') private container: any;
  private player: AnimationPlayer;
  public currentPosition: number;
  private lastPosition: number;
  private obs: any;


  constructor(private builder: AnimationBuilder,
              private store: Store<any>,
              public ngHostEl: ElementRef,
              private renderer: Renderer2,
              private galleryService: UxeGalleryStateService) {
  }

  ngOnInit() {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
    this.lastPosition = 0;
    this.currentPosition = 0;
    this.galleryService.setModalState(true);
    this.galleryService.setDetailState(true);

    this.obs = this.store.pipe(select(selectFeatureExtended));
    this.obs.subscribe((data) => {
      this.paginationAnimate(data.selectedItem, '0ms');
    });
  }

  @HostListener(EventType.CLICK, [ '$event' ])
  public taptap($event) {
    // this.tapped.emit($event);
  }

  /**
   * Set current position to control free pan.
   * Showcased in the template using [ngStyle].
   */
  @HostListener(EventType.PANMOVE, [ '$event' ])
  public move(event: any): void {

    this.currentPosition = this.lastPosition + event.deltaX;
    console.log(this.currentPosition);
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
    });
  }
}
