import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventType } from '../../../_libs/event-types';


@Component({
  selector: 'gxe-gallery-master-item',
  templateUrl: './gallery-master-item.component.html',
  styleUrls: [ './gallery-master-item.component.scss' ],
})
export class GalleryItemComponent implements OnInit {
  @Input() public item;
  @Input() public index;
  @Output() public selected: EventEmitter<any> = new EventEmitter();
  @Input() public isActive: boolean;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {

  }

  @HostListener(EventType.CLICK)
  public selectedItem(): void {
    const { x, y } = this.el.nativeElement.getBoundingClientRect();
    this.selected.emit({ x, y, index: this.index, el: this.el.nativeElement });
  }

}
