import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DoggoService } from './doggo.service';

@Injectable()
export class DoggoResolve implements Resolve<any> {

  constructor(private doggoService: DoggoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.doggoService.get();
  }
}
