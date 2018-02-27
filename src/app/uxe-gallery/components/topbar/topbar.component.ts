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
import { isNil } from 'lodash';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';
import { GalleryItem } from '../../../gxe-gallery/interfaces/gallery-items.interface';
import { PositionalService } from '../overlay/positional-service';


@Component({
  selector: 'uxe-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: [ './topbar.component.scss' ],
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
          top: '-80px',
        })),
      ]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  @Input() public animationState: any;
  @Input() public galleryItems: GalleryItem[];

  public name: string;
  constructor(private posService: PositionalService) {
  }

  ngOnInit() {
    this.posService.currentMessage.subscribe((message) => {
      this.setName(message[1]);
    });
  }

  public setName(index): void  {
    if (isNil(index)) return;
    this.name = this.galleryItems[index][ 0 ].value;
  }
}
