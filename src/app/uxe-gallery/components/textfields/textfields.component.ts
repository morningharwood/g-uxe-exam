import {
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { UxeGalleryStateService } from '../../services/gallery-service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { STANDARD_EASE } from '../../../gxe-gallery/animations/ease.animations';


@Component({
  selector: 'uxe-textfields',
  templateUrl: './textfields.component.html',
  styleUrls: [ './textfields.component.scss' ],
  animations: [
    trigger('enter', [
      state('0', style({
        transform: 'translate(0,100%)'
      })),
      state('1', style({
        transform: 'translate(0,0)'
      })),
      transition('0 => 1', [
        animate(STANDARD_EASE, style({
          transform: 'translate(0,0)'
        })),
      ]),
      transition('1 => 0', [
        animate(STANDARD_EASE, style({
          transform: 'translate(0,100%)'
        })),
      ]),
    ]),
  ]
})
export class TextfieldsComponent implements OnInit, OnChanges {
  @Input() animationState: any;
  constructor(private galleryService: UxeGalleryStateService) {
  }

  ngOnInit() {
    // console.log(this.animationState);
  }
  ngOnChanges() {
    console.log(this.animationState);
  }

  public close(): void {
    this.galleryService.toggleTextfield(false);
  }
}
