import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';

@Component({
  selector: 'uxe-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterBar', [
      state('0', style({
        top: '-80px',
      })),
      state('1', style({
        top: '0',
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          top: '0',
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          top: '-80',
        })),
      ]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  @Input() animationState: any;
  constructor() { }

  ngOnInit() {
  }

}
