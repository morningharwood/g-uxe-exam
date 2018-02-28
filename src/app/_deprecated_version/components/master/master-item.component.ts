/**
 * @fileoverview Master-item component controller. Main purpose is to
 * facilitate the animations from master => detail
 */
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EventType } from '../../enums/event-types';
import { CurrentItem } from '../../interfaces/current-item.interface';
import { GalleryItem } from '../../interfaces/gallery-items.interface';
import { SwipeVerticalService } from '../../../uxe-gallery/services/swipe-vertical.service';


@Component({
  selector: 'gxe-gallery-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: [ './master-item.component.scss' ],
})
export class GalleryItemComponent implements OnInit {
  /**
   * Collection of gallery uxe-animation-portal data.
   */
  @Input() public galleryItems: GalleryItem[];

  /**
   * The components primary uxe-animation-portal data.
   */
  @Input() public item: GalleryItem;

  /**
   * The uxe-animation-portal's iteration index.
   */
  @Input() public index: number;

  /**
   * Whether this uxe-animation-portal is active.
   */
  @Input() public isActive: boolean;

  /**
   * Whether this gallery-detail is open
   */
  @Input() public galleryOpen: boolean;

  /**
   * Emits close
   */
  @Output() public close: EventEmitter<HammerManager> = new EventEmitter();

  /**
   * Emits endingSelection
   */
  @Output() public endingSelect: EventEmitter<number> = new EventEmitter();

  /**
   * Emits starting selection
   */
  @Output() public selected: EventEmitter<CurrentItem> = new EventEmitter();

  /**
   * Emits a tap on master-uxe-animation-portal.
   */
  @Output() public childTap: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Query for host element for animation
   */
  @ViewChild('hostEl') public hostEl: ElementRef;

  /**
   * Query for mask element for animation
   */
  @ViewChild('mask') public mask: ElementRef;

  /**
   * The element's width.
   */
  private elWidth: number;

  constructor(private swipeService: SwipeVerticalService) {
  }

  /**
   * Cache the elWidth on init.
   */
  public ngOnInit(): void {
    this.elWidth = this.hostEl.nativeElement.getBoundingClientRect().width;
  }

  /**
   * Emit when pagination occurs.
   */
  public originalSelectionChanged($event: number): void {
    this.endingSelect.emit($event);
  }

  /**
   * Onclick turn on verticel swipe emit message to parent.
   */
  @HostListener(EventType.CLICK)
  public selectedItem(): void {
    if (this.isActive) return;
    this.turnOnVerticalSwipe();
    this.emitViewChildrenSelected();
  }

  /**
   * Emit payload of state change to parent.
   */
  private emitViewChildrenSelected() {
    const { x, y } = this.hostEl.nativeElement.getBoundingClientRect();
    this.selected.emit(
      {
        x,
        y,
        index: this.index,
        hostEl: this.hostEl.nativeElement,
        mask: this.mask.nativeElement,
      });
  }

  /**
   * Turn on vertical swipe
   */
  private turnOnVerticalSwipe() {
    this.swipeService
      .bootstrap(this.hostEl.nativeElement)
      .on(`${EventType.SWIPEUP} ${EventType.SWIPEDOWN}`,
        () => this.close.emit());
  }

  /**
   * Emit when tapped.
   */
  public tapped(event) {
    this.childTap.emit();
  }
}
