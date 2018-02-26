import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { DATA } from '../uxe-gallery-master/uxe-gallery-master.component';
import { EventType } from '../../../gxe-gallery/enums/event-types';

@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: ['./uxe-gallery-detail.component.scss']
})
export class UxeGalleryDetailComponent implements OnInit {
  public data = DATA;
  public hostEl: any;
  @ViewChild('containerEl') private container: any;
  constructor(
    private store: Store<any>,
    public ngHostEl: ElementRef,
    private renderer: Renderer2) { }
    private currentPosition: any;
    private lastPosition: any;

  ngOnInit() {
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
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
    console.log('touch');
    this.currentPosition = this.lastPosition + event.deltaX;
  }

  /**
   * When pan has ended go to proper page.
   */
  @HostListener(EventType.PANEND, [ '$event' ])
  public end(event: any): void {
    console.log('end');
    // this.paginate(event);
  }
}
