import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { WindowScrolling } from '../../../services/window-scroll.service';
import { mockGalleryItems, GalleryItem } from '../../mock-data';


@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  public galleryItems: GalleryItem[];
  public isActive = false;
  private player: AnimationPlayer;
  @ViewChild('innerContainer') private innerContainer: ElementRef;


  constructor(private store: Store<any>,
              private builder: AnimationBuilder,
              private scrollService: WindowScrolling) {
  }

  public ngOnInit(): void {

    const DOCUMENT_ID = '5a878162500cc2001395c413';
    const YOUR_ORG_SECRET_KEY = 'NWE4NGRhZDM4OTE4OTkwMDEzNjNjOWNi';
    const YOUR_API_KEY = '3QTLJXHW9ZZWPWGGEUN7OHETO'; // Generated-API-Key-1518661038309

    window.fetch('https://api.tipe.io/api/v1/folder/' + DOCUMENT_ID, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': YOUR_API_KEY,
        'Tipe-Id': YOUR_ORG_SECRET_KEY
      }
    })
    .then( (res) =>  res.json())
    .then( (data) => {
      this.galleryItems = data.documents.map(d => d.blocks);
    });
  }
  @HostListener('click')
  public addClass() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.scrollService.disable();
    } else {
      this.scrollService.enable();
    }
  }


  public close() {
    this.player.reset();
  }

  public selectedItem($event) {
    const to = {
      x: 0,
      y: (window.outerHeight - ($event.el.offsetHeight * 2)) / 2
    };


    this.itemAnimate($event.x, $event.y, $event.el, to);
  }
  // 0, -101.25

  public itemAnimate(x, y, el, to) {

    this.player = this.builder.build([
      style({
        transformOrigin: `${x}px ${y}px`,
      }),
      animate(
        '350ms cubic-bezier(.35, 0, .25, 1)',
        style({
          transform: `translate3d(${to.x}px, ${to.y}px, 0) scale(2)`,
        }),
      ),
    ]).create(el);

    this.player.play();

    this.player.onDone(() => {
      this.player.pause();
    });
  }
}
