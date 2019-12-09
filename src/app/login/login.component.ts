import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors: any;
  submitted = false;
  errorMessage = '';
  returnURL = '/';

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {

    console.log('V Login Component');
    this.loginForm = formBuilder.group({
      rememberMe: [''],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.loginForm.valueChanges.subscribe(data => this.onValueChanged(data));
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
      email: {valid: true, message: ''},
      password: {valid: true, message: ''}
    };
  }

  isValid(field): boolean {
    let isValid = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this.loginForm.controls[field].touched === false) {
      isValid = true;
    } else if (this.loginForm.controls[field].touched === true && this.loginForm.controls[field].valid === true) {
      // If the field is touched and valid value, then it is considered as valid.
      isValid = true;
    }
    return isValid;
  }

  public onValueChanged(data?: any) {
    if (!this.loginForm) {
      return;
    }
  }

  ngOnInit() {
    this.resetFormErrors();
    this.userService.logout();

    // get return url from route parameters or default to '/'
    this.returnURL = this.activatedRoute.snapshot.queryParams.r || '/';
  }

  public onSubmit(elementValues: any) {
    this.submitted = true;
    this.userService.login(elementValues.email, elementValues.password, elementValues.rememberMe).subscribe(
      result => {
        if (result.success) {
          this.router.navigate([this.returnURL]);
        } else {
          this.errorMessage = 'Username or password is incorrect.';
          this.submitted = false;
        }
      },
      error => {
        this.submitted = false;
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
}
