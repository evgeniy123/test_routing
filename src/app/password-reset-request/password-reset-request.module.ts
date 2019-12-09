import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PasswordResetRequestComponent } from './password-reset-request.component';
import { PasswordResetRequestRoutingModule } from './password-reset-request-routing.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, SharedModule, PasswordResetRequestRoutingModule, TranslateModule],
  declarations: []
})
export class PasswordResetRequestModule {}
