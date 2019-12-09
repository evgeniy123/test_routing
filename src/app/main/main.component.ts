import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SecurityService} from '../services/security.service';
import {TranslateService} from '@ngx-translate/core';
import {AskTrialService} from '../services/ask-trial.service';
import {UserService} from '../services/user.service';
import {ReCaptchaV3Service} from 'ngx-captcha';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SubscribeService} from '../services/subscribe.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../app.component.scss']
})

export class MainComponent implements OnInit, OnDestroy {
  title = 'remake-pizcool-angular';
  private subscription: Subscription;
  public errorMessageAskTrial = false;
  private answer: AskTrial;
  selectedLanguage: string;
  onLine = false;  // __ Polzovatel onLine ili net
  languages: { id: string, title: string }[] = [];
  date: Date = new Date();
  askTrialForm: FormGroup;
  subscribeForm: FormGroup;
  submittedAskTrial = false;
  submittedNewsLetter = false;
  errorMessage: string;
  formErrors: any;

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private translateService: TranslateService,
    private askTrialService: AskTrialService,
    private userService: UserService,
    private subscribeService: SubscribeService,
    private formBuilder: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service) {

    this.askTrialForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.subscribeForm = formBuilder.group({
      subscribe: ['', Validators.required]
    });


    this.askTrialForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  public onValueChanged(data?: any) {
    if (!this.askTrialForm) {
      return;
    }
  }

  public onSubmitAskTrial(elementValues: any) {
    this.submittedAskTrial = true;

  /*  this.userService.login(elementValues.username, elementValues.password).subscribe(
      result => {
        if (result.success) {
          // this.router.navigate([this.returnURL]);
        } else {
          this.errorMessage = 'Username or password is incorrect.';
          this.submittedAskTrial = false;
        }
      },
      error => {
        this.submittedAskTrial = false;
        // Validation error
        if (error.status === 422) {
          this.resetFormErrors();
          // this.errorMessage = "There was an error on submission. Please check again.";
          const errorFields = JSON.parse(error.data.message);
          this.setFormErrors(errorFields);
        } else {
          this.errorMessage = error.data;
        }
      }
    ); */
  }

  public onSubscribe(elementValues: any) {
    this.submittedNewsLetter = true;
    this.subscribeService.subscribe(elementValues.subscribe).subscribe(
      result => {
        if (result.success) {
          // this.router.navigate([this.returnURL]);
        } else {
          this.errorMessage = 'Username or password is incorrect.';
          this.submittedNewsLetter = false;
        }
      },
      error => {
        this.submittedNewsLetter = false;
        // Validation error
        if (error.status === 422) {
          this.resetFormErrors();
          // this.errorMessage = "There was an error on submission. Please check again.";
          const errorFields = JSON.parse(error.data.message);
          this.setFormErrors(errorFields);
        } else {
          this.errorMessage = error.data;
        }
      }
    );
  }

  setFormErrors(errorFields: any): void {
    for (const key in errorFields) {
      // skip loop if the property is from prototype
      if (!errorFields.hasOwnProperty(key)) {
        continue;
      }

      this.formErrors[key].valid = false;
      this.formErrors[key].message = errorFields[key];
    }
  }

  resetFormErrors(): void {
    this.formErrors = {
      username: {valid: true, message: ''},
      password: {valid: true, message: ''}
    };
  }


  ngOnInit(): void {

    // this.onLine = this.userService.getToken();
    // initialize translate service
    //  this.translateService.use(environment.defaultLocale);
    ///  this.selectedLanguage = environment.defaultLocale;


    // console.log('V main component: ' + this.csrfToken);
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

  changeLocale() {
    this.translateService.use(this.selectedLanguage);
  }


  public submitAskTrial(captchaResponse: string): void {

    this.askTrialService.askTrial().subscribe(response => {
      this.answer = response;
    });

    // __ Esli oshibok net
    this.errorMessageAskTrial = this.answer.errors != null;


    // this.http.post({
    //     captcha: captchaResponse,
    //     /* ... */
    // });
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
