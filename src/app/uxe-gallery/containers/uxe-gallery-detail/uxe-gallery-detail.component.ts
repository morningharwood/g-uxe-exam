import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'uxe-gallery-detail',
  templateUrl: './uxe-gallery-detail.component.html',
  styleUrls: ['./uxe-gallery-detail.component.scss']
})
export class UxeGalleryDetailComponent implements OnInit {

  constructor(private store: Store<any>) { }

  ngOnInit() {
  }

}
