import {
  AnimationBuilder,
} from '@angular/animations';
import {
  Component, HostBinding, HostListener,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { mockGalleryItems, GalleryItem } from '../../mock-data';




@Component({
  selector: 'gxe-gallery-master',
  templateUrl: './master.component.html',
  styleUrls: [ './master.component.scss' ],
})
export class GalleryMasterComponent implements OnInit {
  public galleryItems: GalleryItem[];
  public isActive = false;
  private itemActive: number;

  constructor(private store: Store<any>,
              private builder: AnimationBuilder) {
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
      console.log(data);
      this.galleryItems = data.documents.map(d => d.blocks);
      console.log(this.galleryItems);
    });
  }
  @HostListener('click')
  public addClass() {
    this.isActive = !this.isActive;
  }


  public activate(item: number) {
    this.itemActive = item;
  }
}
