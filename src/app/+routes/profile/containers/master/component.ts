import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFeature } from '../../components/video-block/actions/index';
import * as content from '../resume/content/data';

@Component({
  selector: 'mh-master-profile',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class MasterProfileContainerComponent {
  public me = content.me;
  public selectedVideoObs: Store<any>;

  constructor(private store: Store<any>) {
    this.selectedVideoObs = store.select(selectFeature);
  }

}

