import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GalleryItem } from '../../interfaces/gallery-items.interface';


@Component({
  selector: 'gxe-gallery-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() item: GalleryItem;
  constructor() { }

  ngOnInit() {
  }

}
