import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'uxe-gallery-master',
  templateUrl: './uxe-gallery-master.component.html',
  styleUrls: ['./uxe-gallery-master.component.scss']
})
export class UxeGalleryMasterComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
