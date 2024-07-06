import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.authService
        .login$(
          this.loginForm.get('username')?.value!,
          this.loginForm.get('password')?.value!
        )
        .subscribe({
          next: (res) => {
            this.router.navigate(['personal-area']);
          },
          error: (err) => {
            console.error(err);
          },
        });
    }
  }
}
