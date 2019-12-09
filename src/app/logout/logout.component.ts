import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';

@Component({
  selector: 'app-logout',
  template: '<strong>{{ "LOGGING_OUT" | translate}}</strong>'
})
export class LogoutComponent implements OnInit {
  public submitted: boolean = false;
  public error: string = '';

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
