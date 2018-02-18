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
import { EventType } from '../../../_libs/event-types';
import { GalleryItem } from '../../mock-data';


@Component({
  selector: 'gxe-gallery-master-item',
  templateUrl: './gallery-master-item.component.html',
  styleUrls: [ './gallery-master-item.component.scss' ],
})
export class GalleryItemComponent implements OnInit {
  @Input() public item;
  @Input() public index;
  @Input() public galleryItems: GalleryItem[];
  @Input() public isActive: boolean;
  @Output() public selected: EventEmitter<any> = new EventEmitter();
  @Output() public endingSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild('hostEl') public hostEl: ElementRef;
  @ViewChild('mask') public mask: ElementRef;
  public selectedIndex: any;

  constructor() {
  }

  ngOnInit() {

  }

  public originalSelectionChanged($event) {
    this.endingSelect.emit($event);
  }


  @HostListener(EventType.CLICK)
  public selectedItem(): void {
    const { x, y } = this.hostEl.nativeElement.getBoundingClientRect();
    this.selectedIndex = this.index;
    this.selected.emit(
      {
        x,
        y,
        index: this.index,
        hostEl: this.hostEl.nativeElement,
        mask: this.mask.nativeElement
      });

  }

}
