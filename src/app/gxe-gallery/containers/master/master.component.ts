import {
  animate,
  style,
  AnimationBuilder,
  AnimationPlayer,
} from '@angular/animations';
import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { WindowScrolling } from '../../../services/window-scroll.service';
import { GalleryItem } from '../../mock-data';


@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  public galleryItems: GalleryItem[];
  public isActive = false;

  private to: { x: number; y: number };
  private from: { x: number; y: number };
  private currentItem: any;
  private playerStart: AnimationPlayer;
  private playerEnd: AnimationPlayer;


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

    const from = {
      x: this.to.x,
      y: this.to.y
    };

    const to = {
      x: 0,
      y: 0
    };

    this.itemAnimateBack(from, to, this.currentItem, 1);
  }

  public selectedItem($event) {
    this.from = {
      x: $event.x,
      y: $event.y,
    };

    this.to = {
      x: 0,
      y: (window.outerHeight - ($event.el.offsetHeight * 2)) / 2
    };

    this.currentItem = $event.el;

    this.itemAnimate(this.from, this.to, this.currentItem, 2);
  }

  public itemAnimate(from, to, el, scale) {

    this.playerStart = this.builder.build([
      style({
        transformOrigin: `${from.x}px ${from.y}px`,
      }),
      animate(
        '350ms cubic-bezier(.35, 0, .25, 1)',
        style({
          transform: `translate3d(${to.x}px, ${to.y}px, 0) scale(${scale})`,
        }),
      ),
    ]).create(el);

    this.playerStart.play();

    this.playerStart.onDone(() => {
      this.playerStart.pause();
    });
  }

  public itemAnimateBack(from, to, el, scale) {

    this.playerEnd = this.builder.build([
      animate(
        '350ms cubic-bezier(.35, 0, .25, 1)',
        style({
          transform: `translate3d(${to.x}px, ${to.y}px, 0) scale(${scale})`,
        }),
      ),
    ]).create(el);

    this.playerEnd.play();

    this.playerEnd.onDone(() => {
      this.playerStart.destroy();
      this.playerStart = null;

      this.playerEnd.destroy();
      this.playerEnd = null;
    });
  }
}
