/**
 * Convention for forRoot()
 * http://angularfirst.com/the-ngmodule-forroot-convention/
 */
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { DoggoService } from './doggo.service';


@NgModule({
  imports: [],
  exports: []
})
export class DoggoModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: DoggoModule,
      providers: [ DoggoService ]
    };
  }
}
