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
import { EventType } from '../../../enums/event-types';
import { GalleryItem } from '../../../interfaces/gallery-items.interface';
import { SwipeVerticalService } from '../../../services/swipe-vertical.service';


@Component({
  selector: 'gxe-gallery-master-item',
  templateUrl: './master-item.component.html',
  styleUrls: [ './master-item.component.scss' ],
})
export class GalleryItemComponent implements OnInit {
  @Input() public item;
  @Input() public index;
  @Input() public galleryItems: GalleryItem[];
  @Input() public isActive: boolean;
  @Output() public selected: EventEmitter<any> = new EventEmitter();
  @Output() public endingSelect: EventEmitter<any> = new EventEmitter();
  @Output() public close: EventEmitter<any> = new EventEmitter();
  @ViewChild('hostEl') public hostEl: ElementRef;
  @ViewChild('mask') public mask: ElementRef;
  public selectedIndex: any;
  private elWidth: number;

  constructor(private swipeService: SwipeVerticalService) {
  }

  public ngOnInit(): void {
    this.elWidth = this.hostEl.nativeElement.getBoundingClientRect().width;
  }

  public originalSelectionChanged($event): void {
    this.endingSelect.emit($event);
  }


  @HostListener(EventType.CLICK)
  public selectedItem(): void {
    if (this.isActive) {
      return;
    }

    const hammer = this.swipeService.bootstrap(this.hostEl.nativeElement);
    const { x, y } = this.hostEl.nativeElement.getBoundingClientRect();

    hammer.on(`${EventType.SWIPEUP} ${EventType.SWIPEDOWN}`,
      () => {
        this.close.emit(hammer);
    });

    this.selected.emit(
      {
        x,
        y,
        index: this.index,
        hostEl: this.hostEl.nativeElement,
        mask: this.mask.nativeElement,
      });
  }

}
