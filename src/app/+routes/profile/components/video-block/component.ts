import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { get } from 'lodash';

import { Clear } from './actions';
import * as YouTubePlayer from 'youtube-player';

const ID = 'mh-yt-videoframe';

@Component({
  selector: 'mh-video-block',
  templateUrl: './component.html',
  styleUrls: [
    '../shared-styles.scss',
    './component.scss',
  ],
  animations: [

    trigger('popOverState', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(500px)',
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('600ms ease-in')),
    ]),
  ],
})
export class VideoBlockComponent implements OnInit,
                                            OnDestroy,
                                            OnChanges {
  @Input() public data: any;
  public title: string;
  public player: any;

  constructor(private store: Store<any>) {
  }

  @HostBinding('@popOverState')
  public get stateName(): string {
    const hasId = get(this.data, 'data.youtubeId', '');
    return hasId
      ? 'show'
      : 'hide';
  }

  public ngOnInit() {
    this.player = YouTubePlayer(ID, {
      height: 190,
      width: 337,
    });
  }

  public ngOnChanges() {
    this.title = get(this.data, 'data.title', '');
    if (get(this.data, 'data.youtubeId', '')) {
      this.player.loadVideoById(this.data.data.youtubeId);
      this.player.playVideo();
    }
  }

  public ngOnDestroy(): void {
    this.player.stopVideo();
  }

  public close(): void {
    this.player.stopVideo()
        .then(() => {
          this.store.dispatch(new Clear());
        });
  }
}
