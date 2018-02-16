import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GalleryItem } from '../../mock-data';


@Component({
  selector: 'gxe-gallery-detail-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() data: GalleryItem;
  constructor() { }

  ngOnInit() {
  }

}
