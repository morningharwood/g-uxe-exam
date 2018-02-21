import {
  animate,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../animations/ease.animations';
import { GalleryItem } from '../../interfaces/gallery-items.interface';


@Component({
  selector: 'gxe-gallery-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
  animations: [
    trigger('activate', [
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          padding: '0',
          background: '#000000',
          opacity: 0,
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_LEAVE, style({
          padding: '6px',
          background: 'transparent',
          opacity: 1,
        })),
      ]),
    ]),
  ],
})
export class ItemComponent implements OnInit {
  @Input() item: GalleryItem;
  @Input() isActive: boolean;
  constructor() { }

  ngOnInit() {
  }

}
