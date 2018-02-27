import {
  AnimationBuilder,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { PositionalService } from '../../components/overlay/positional-service';
import { UxeGalleryStateService } from '../../services/gallery-service';
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
    this.animationService.itemAnimate(this.posService.move, this.hostEl, this.imgEl);
    this.posService.currentMessage.subscribe(message => {
      this.imgSrc = message[0];
    });
  }

  private setNativeElement() {
    // TODO (mharwood) call this again on window.resize.
    this.hostEl = this.renderer.selectRootElement(this.ngHostEl).nativeElement;
    this.imgEl  = this.renderer.selectRootElement(this.innerImg).nativeElement;
  }
}
