import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GalleryItem } from '../../interfaces/gallery-items.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  SEAMLESS_EASE,
  STANDARD_EASE,
} from '../../animations/ease.animations';


@Component({
  selector: 'gxe-gallery-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
  animations: [
    trigger('activate', [
      transition('0 => 1', [
        animate(SEAMLESS_EASE, style({
          padding: '0',
          background: '#000000',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          padding: '6px',
          background: 'white',
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
