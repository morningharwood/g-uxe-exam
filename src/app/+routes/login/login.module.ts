import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '../../_other/core';
import { UserCardComponent } from './components/user-card/component';
import { LoginContainerMasterComponent } from './container/master/component';
import { routes } from './routes';
import {MatInputModule} from '@angular/material/input';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

export const EXPORTS_DECLARATIONS = [
  LoginContainerMasterComponent,
  UserCardComponent,
];

@NgModule({
  imports: [
    CommonModule,
    routes,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ ...EXPORTS_DECLARATIONS ],
  declarations: [ ...EXPORTS_DECLARATIONS ],
  providers: [],
})
export class LoginRouteModule {
}
