import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class DoggoService {
  constructor(private http: HttpClient) {}
  public getDoggos() {
    const FOLDER_ID = '5a878162500cc2001395c413';
    const ORG_KEY = 'NWE4NGRhZDM4OTE4OTkwMDEzNjNjOWNi';
    const API_KEY = '3QTLJXHW9ZZWPWGGEUN7OHETO'; // Generated-API-Key-1518661038309
    return this.http.get(`https://api.tipe.io/api/v1/folder/${FOLDER_ID}`, {
      headers: new HttpHeaders()
          .set('Authorization', API_KEY)
          .set('Origin', 'gxe-gallery.firebaseapp.com')
          .set('Tipe-Id', ORG_KEY)
    });
  }
}
