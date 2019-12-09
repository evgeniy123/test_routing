import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PasswordResetRequestComponent} from './password-reset-request.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: PasswordResetRequestComponent
  }
];

@NgModule({
  declarations: [PasswordResetRequestComponent],
  imports: [RouterModule.forChild(routes), TranslateModule, SharedModule, CommonModule],
  exports: [RouterModule]
})
export class PasswordResetRequestRoutingModule {
}
