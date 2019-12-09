import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    data: {
      title: 'Main'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {
}
