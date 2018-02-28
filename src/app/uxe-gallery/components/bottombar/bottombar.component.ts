import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { UxeGalleryStateService } from '../../services/gallery-service';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../animations/ease.animations';

@Component({
  selector: 'uxe-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss'],
  animations: [
    trigger('enterBar', [
      state('0', style({
        bottom: '-160px',
      })),
      state('1', style({
        bottom: '0',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          bottom: '0',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_LEAVE, style({
          bottom: '-160px',
        })),
      ]),
    ]),
    trigger('brushBar', [
      state('0', style({
        height: 0,
        background: 'transparent',
      })),
      state('1', style({
        height: '100px',
        background: '#f7f7f7',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          height: '100px',
          background: '#f7f7f7',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          height: 0,
          background: 'transparent',
        })),
      ]),
    ]),
  ],
})
export class BottombarComponent implements OnInit {
  /**
   * Input from ngrx/store of animation State.
   */
  @Input() animationState: any;
  constructor(private galleryService: UxeGalleryStateService) { }

  ngOnInit() {
  }

  /**
   * Toggles the animation state and sends it back up to store via toggleBrush method.
   */
  public toggleBrushBar() {
    this.animationState.brushbarTemplate = !this.animationState.brushbarTemplate;
    this.galleryService.toggleBrush(this.animationState.brushbarTemplate);
  }

}
