import {BrowserModule} from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MissingTranslationService} from './services/missing-translation.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgxCaptchaModule} from 'ngx-captcha';
import {RECAPTCHA_NONCE, RecaptchaLoaderService} from 'ng-recaptcha';
import {Constants} from './Constants';
import {environment} from '../environments/environment';
import {JWT_OPTIONS, JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {LOCAL_STORAGE, NgtUniversalModule} from '@ng-toolkit/universal';
import {BehaviorSubject, Observable} from 'rxjs';
import {StyleDirective} from './directives/style.directive';
import {P404Component} from './pages/p404.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {GlobalService} from './services/global.service';
import {PasswordResetRequestModule} from './password-reset-request/password-reset-request.module';
import {SharedModule} from './shared/shared.module';
import {LoginModule} from './login/login.module';
import {LogoutModule} from './logout/logout.module';
import {FrontendLayoutComponent} from './layout/frontend-layout.component';
import {AuthGuard} from './models/auth.guard';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}


export function jwtOptionsFactory(localStorage) {
  return {
    tokenGetter: () => {
      return localStorage.getItem(environment.tokenName) || '';
    }
  };
}

@Injectable()
export class PreloadedRecaptchaAPIService {
  public ready: Observable<ReCaptchaV2.ReCaptcha>;

  constructor() {
    const readySubject = new BehaviorSubject<ReCaptchaV2.ReCaptcha>(grecaptcha);
    this.ready = readySubject.asObservable();
  }
}


@NgModule({
  declarations: [
    StyleDirective,
    FrontendLayoutComponent,
    //  SpinnerComponent,
    P404Component
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    LoginModule,
    LogoutModule,
    PasswordResetRequestModule,
    NgtUniversalModule,
    AppRoutingModule,
    SharedModule,
    NgxCaptchaModule,
    // RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [LOCAL_STORAGE]
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      useDefaultLang: false,
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: MissingTranslationService},
    })
  ],
  providers: [
    {
      provide: RECAPTCHA_NONCE,
      useValue: Constants.getConstants().key_captcha
    },
    AuthGuard,
    UserService,
    GlobalService,

  ],
  bootstrap: [FrontendLayoutComponent]
})

export class AppModule {

}





