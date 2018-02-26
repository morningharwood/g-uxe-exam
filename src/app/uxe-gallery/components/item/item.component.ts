import {
  animate,
  keyframes,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  select,
  Store,
} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  STANDARD_EASE,
  STANDARD_LEAVE,
} from '../../../gxe-gallery/animations/ease.animations';
import { UxeGalleryStateService } from '../../services/gallery-service';
import { PositionalService } from '../overlay/positional-service';
import { ItemAnimationsService } from './item.animations';


@Component({
  selector: 'uxe-item',
  templateUrl: './item.component.html',
  styleUrls: [ './item.component.scss' ],
})
export class ItemComponent implements OnInit {
  public hostEl: any;
  public imgEl: any;
  @ViewChild('innerImg') public innerImg: any;
  private imgSrc: string;

  constructor(private builder: AnimationBuilder,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private posService: PositionalService,
              private galleryStateService: UxeGalleryStateService,
              private animationService: ItemAnimationsService) {
  }

  ngOnInit() {
    this.setNativeElement();
    this.imgSrc = this.posService.imgEl.imgSrc;
    this.animationService.itemAnimate(this.posService.move, this.hostEl, this.imgEl);
  }

  private setNativeElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
    this.imgEl  = this.renderer.selectRootElement(this.innerImg).nativeElement;
  }
}
