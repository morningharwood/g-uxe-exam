import {
  Component,
  OnInit,
} from '@angular/core';
import { DoggoService } from './services/doggo.service';

@Component({
  selector: 'gxe-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  public isActive = false;
  private galleryItems: any;
  constructor(private doggos: DoggoService) {}
  public ngOnInit(): void {
    this.doggos.getDoggos().subscribe((doggos) => {
      this.galleryItems = doggos['documents'].map(d => d.blocks);
    });
  }
  public activeModal() {
    console.log('lskdfjlsdk')
    this.isActive = !this.isActive;
  }
}
