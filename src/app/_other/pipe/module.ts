import { NgModule } from '@angular/core';
import { CommaToAndPipe } from './comma';
import { SupSubPipe } from './sup_sub';


const DECLARE_EXPORT = [
  SupSubPipe,
  CommaToAndPipe,
];

@NgModule({
  imports: [],
  exports: [...DECLARE_EXPORT],
  declarations: [...DECLARE_EXPORT],
  providers: [],
})
export class MhPipesModule {
}
