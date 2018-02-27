import {
  Component,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { EventType } from '../../../gxe-gallery/enums/event-types';

@Component({
  selector: 'uxe-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {
  @Input() public galleryItem: any;
  private currentPosition: any;
  private lastPosition: any;

  ngOnInit() {
    console.log(this.galleryItem, 'image');
  }
}
