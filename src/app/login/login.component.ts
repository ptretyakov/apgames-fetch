import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { AuthData } from 'app/shared/models/auth-data.model';
import { AuthService } from 'app/shared/auth.service';

@Component({
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
  authData: AuthData = { login: '', password: '' };
  loginForm: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl(this.authData.login, [
        Validators.required,
        Validators.minLength(4),
      ]),
      'password': new FormControl(this.authData.password, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit(): any {
    this.authService.login({
      failed: (result: boolean) => { console.error('Failed', result) },
      success: (result: boolean) => { console.info('Success', result) },
      authData: this.authData,
    }).subscribe((result: boolean) => {
      console.info('Obser completed', result);
    });
  }

  get login() { return this.loginForm.get('login'); }
  get password() { return this.loginForm.get('password'); }
}