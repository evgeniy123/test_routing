import { NgModule } from '@angular/core';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [LogoutRoutingModule, TranslateModule],
  declarations: [LogoutComponent]
})
export class LogoutModule {}
