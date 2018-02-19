import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Update } from '../../video-block/actions/index';

@Component({
  selector: 'mh-title',
  templateUrl: './component.html',
  styleUrls: ['../component.scss'],
})
export class TitleComponent implements OnInit {

  @Input() public data: any;

  constructor(private store: Store<any>) {
  }

  public ngOnInit(): void {
  }

  @HostListener('click')
  videoOpen() {
    if (this.data.youtubeId) {
      this.store.dispatch(new Update({data: this.data}));
    }
  }
}

