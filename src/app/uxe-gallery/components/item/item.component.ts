import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import {
  STANDARD_EASE,
} from '../../../gxe-gallery/animations/ease.animations';
import { PositionalService } from '../overlay/positional-service';


@Component({
  selector: 'uxe-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  private playerStart: AnimationPlayer;
  constructor(private builder: AnimationBuilder,
              private ngHostEl: ElementRef,
              private renderer: Renderer2,
              private posService: PositionalService) { }

  ngOnInit() {
    this.itemAnimate(this.posService.move, this.renderer.selectRootElement(this.ngHostEl).nativeElement);
  }

  private itemAnimate(move, el): void {
    this.playerStart = this.builder.build([
      style({
        transform: `translate3d(${move.from.x}px, ${move.from.y}px, 0px)`,
      }),
      animate(
        STANDARD_EASE,
        style({
          transform: `translate3d(${move.to.x}px, ${move.to.y}px, 1px) scale(2)`,
          zIndex: 1,
        }),
      ),
    ]).create(el);

    this.playerStart.play();
  }

}
