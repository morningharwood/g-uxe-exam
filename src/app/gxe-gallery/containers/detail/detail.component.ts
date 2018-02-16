import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { GalleryItem } from '../master/master.component';

@Component({
  selector: 'gxe-gallery-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class GalleryDetailComponent implements OnInit {
  @Input() data: GalleryItem;

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
