import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FrontendLayoutComponent} from './layout/frontend-layout.component';
import {AuthGuard} from './models/auth.guard';
import {P404Component} from './pages/p404.component';


export const routes: Routes = [
  {
    path: '',
    component: FrontendLayoutComponent,
    pathMatch: 'full',
    loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
  },
  /*{
    path: '',
    component: FrontendLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'account',
        loadChildren: 'app/account/account.module#AccountModule'
      }
    ]
  }, */
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
      {
        path: 'user/request-password-reset',
        loadChildren: () => import('./password-reset-request/password-reset-request-routing.module')
          .then(mod => mod.PasswordResetRequestRoutingModule),
      },
      {
        path: 'user/login',
        loadChildren: () => import('./login/login.module')
          .then(mod => mod.LoginModule)
      },

      {
        path: 'user/logout',
        loadChildren: () => import('./logout/logout.module')
          .then(mod => mod.LogoutModule),
      },

      // otherwise redirect to home
      {
        path: '**',
        component: P404Component
      }
      /* {
         path: 'main',
         loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
       }, */
      /* {
         path: 'signup',
         loadChildren: 'app/signup/signup.module#SignupModule'
       },
       {
         path: 'confirm',
         loadChildren: 'app/confirm/confirm.module#ConfirmModule'
       },
       {
         path: 'password-reset-request',
         loadChildren: 'app/password-reset-request/password-reset-request.module#PasswordResetRequestModule'
       },
       {
         path: 'password-reset',
         loadChildren: 'app/password-reset/password-reset.module#PasswordResetModule'
       },
       {
         path: 'sample-page',
         loadChildren: 'app/sample-page/sample-page.module#SamplePageModule'
       } */
    ]
  },
  // otherwise redirect to home
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
