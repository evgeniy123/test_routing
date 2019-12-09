import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {OnExecuteDataCaptcha} from './interfaces/on-execute-data-captcha';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {SecurityService} from './services/security.service';
import {AskTrialService} from './services/ask-trial.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'remake-pizcool-angular';
  private subscription: Subscription;
  selectedLanguage: string;
  onLine = false;  // __ Polzovatel onLine ili net
  languages: { id: string, title: string }[] = [];
  date: Date = new Date();
  csrfToken: string;
  userName: string;
  userSurName: string;


  constructor(
    private securityService: SecurityService,
    private translateService: TranslateService,
    private askTrialService: AskTrialService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.onLine = this.userService.getToken();
    console.log("polzovatel Online: " + this.onLine);
    // initialize translate service
    this.translateService.use(environment.defaultLocale);
    this.selectedLanguage = environment.defaultLocale;

   // this.csrfToken = this.securityService.getCsrf();

    /* this.subscription = this.recaptchaV3Service.onExecute
         .subscribe((data: OnExecuteDataCaptcha) => {
             console.log(data.token);
             //  this.handleRecaptchaExecute(data.action, data.token);
         }); */


    this.translateService.get(environment.locales.map(x => `LANGUAGES.${x.toUpperCase()}`))
      .subscribe(translations => {
        // init dropdown list with TRANSLATED list of languages from config
        this.languages = environment.locales.map(x => {
          return {
            id: x,
            title: translations[`LANGUAGES.${x.toUpperCase()}`],
          };
        });
      });

    // it's also possible (and convenient) to use this.translateService.instant
    // but it could be NOT loaded yet at this moment, OnInit of App.Component
  }

  // changeLocale() {
  //   this.translateService.use(this.selectedLanguage);
  // }

  changeLocale(language: string) {
    this.translateService.use(language);
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
