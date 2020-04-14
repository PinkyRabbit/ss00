import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  windowHeight = 0;
  boxShadow = 'none';
  loader = true;
  loaderText = 'С возвращением! Входим в чатик...';
  loaderHeight = 100;
  auth = {
    username: '',
    password: '',
  };

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {}

  private getWindowHeigh() {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }

  private getBoxShadow() {
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const shadowWidth = windowWidth / 3;
    return 'inset 0 0 ' + shadowWidth + 'px rgba(0, 0, 0, 0.5)';
  }

  ngOnInit() {
    this.windowHeight = this.getWindowHeigh();
    this.boxShadow = this.getBoxShadow();
  }

  onResize(event) {
    this.windowHeight = this.getWindowHeigh();
    this.boxShadow = this.getBoxShadow();
  }

  loaderOn(text) {
    this.loader = false;
    this.loaderHeight = document.getElementById(
      'registration-form'
    ).offsetHeight;
  }

  loaderOff(a) {
    this.loader = true;
  }

  submitForm(e) {
    const { username, password } = this.auth;
    if (!username || !password) {
      return false;
    }

    this.authService.login(username, password).subscribe(
      (_) => {
        setTimeout(() => {
          this.router.navigate(['/chat/asdhfkajsdf']);
        }, 5000);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // login() {
  //   this.error = '';
  //   const username = this.form.value.username;
  //   const password = this.form.value.password;
  //   this.authService.login(username, password).subscribe(
  //     (_) => {
  //       this.router.navigate(['/']);
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.error = error.error.detail;
  //     }
  //   );
  // }
}
