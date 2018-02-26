import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'uxe-bottombar',
  templateUrl: './bottombar.component.html',
  styleUrls: ['./bottombar.component.scss'],
  animations: [
    trigger('enterBar', [
      state('0', style({
        bottom: '-80px',
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
        animate(STANDARD_EASE, style({
          bottom: '-80',
        })),
      ]),
    ]),
  ],
})
export class BottombarComponent implements OnInit {
  @Input() animationState: any;
  constructor() { }

  ngOnInit() {
  }

}
