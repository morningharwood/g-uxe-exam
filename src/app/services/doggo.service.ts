import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { GalleryItem } from '../gxe-gallery/interfaces/gallery-items.interface';


@Injectable()
export class DoggoService {
  constructor(private http: HttpClient) {}

  /**
   * Fetch data from https://tipe.io a cms endpoint of doggos.
   */
  public get(): Observable<Array<Array<GalleryItem>>> {
    const FOLDER_ID = '5a878162500cc2001395c413';
    const ORG_KEY = 'NWE4NGRhZDM4OTE4OTkwMDEzNjNjOWNi';
    const API_KEY = '3QTLJXHW9ZZWPWGGEUN7OHETO'; // Generated-API-Key-1518661038309
    return this.http.get(`https://api.tipe.io/api/v1/folder/${FOLDER_ID}`, {
      headers: new HttpHeaders()
          .set('Authorization', API_KEY)
          .set('Tipe-Id', ORG_KEY)
    }).pipe(map((doggos) => doggos['documents'].map(d => d.blocks)));
  }
}
