import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GalleryItem } from '../../mock-data';


@Component({
  selector: 'gxe-gallery-detail-item',
  templateUrl: './gallery-detail-item.component.html',
  styleUrls: ['./gallery-detail-item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() data: GalleryItem;
  constructor() { }

  ngOnInit() {
  }

}
