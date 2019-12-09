import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {TranslateModule} from '@ngx-translate/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {MainRoutingModule} from './main-routing.module';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    data: {
      title: 'Main'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule, MainRoutingModule, CommonModule, SharedModule],
  declarations: [MainComponent],
  exports: [RouterModule]
})
export class MainModule {

}
