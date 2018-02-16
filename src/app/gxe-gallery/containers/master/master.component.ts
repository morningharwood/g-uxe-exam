import {
  AnimationBuilder,
} from '@angular/animations';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';




@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {

  constructor(private store: Store<any>,
              private builder: AnimationBuilder) {
  }

  public ngOnInit(): void {

  }


}
