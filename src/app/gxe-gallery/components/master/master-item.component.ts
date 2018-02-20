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
import { SwipeVerticalService } from '../../services/swipe-vertical.service';


@Component({
  selector: 'gxe-gallery-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: [ './master-item.component.scss' ],
})
export class GalleryItemComponent implements OnInit {
  @Input() public galleryItems: GalleryItem[];
  @Input() public item: GalleryItem;
  @Input() public index: number;
  @Input() public isActive: boolean;
  @Output() public close: EventEmitter<HammerManager> = new EventEmitter();
  @Output() public endingSelect: EventEmitter<number> = new EventEmitter();
  @Output() public selected: EventEmitter<CurrentItem> = new EventEmitter();
  @ViewChild('hostEl') public hostEl: ElementRef;
  @ViewChild('mask') public mask: ElementRef;
  private elWidth: number;

  constructor(private swipeService: SwipeVerticalService) {
  }

  public ngOnInit(): void {
    this.elWidth = this.hostEl.nativeElement.getBoundingClientRect().width;
  }

  public originalSelectionChanged($event: number): void {
    this.endingSelect.emit($event);
  }

  @HostListener(EventType.CLICK)
  public selectedItem(): void {
    if (this.isActive) return;
    this.turnOnVerticalSwipe();
    this.emitViewChildrenSelected();
  }

  private emitViewChildrenSelected() {
    const { x, y } = this.hostEl.nativeElement.getBoundingClientRect();
    console.log(this.index);
    this.selected.emit(
      {
        x,
        y,
        index: this.index,
        hostEl: this.hostEl.nativeElement,
        mask: this.mask.nativeElement,
      });
  }

  private turnOnVerticalSwipe() {
    this.swipeService
      .bootstrap(this.hostEl.nativeElement)
      .on(`${EventType.SWIPEUP} ${EventType.SWIPEDOWN}`,
        () => this.close.emit());
  }
}
