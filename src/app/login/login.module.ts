import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, LoginRoutingModule, SharedModule, TranslateModule],
  declarations: [LoginComponent]
})
export class LoginModule {}
