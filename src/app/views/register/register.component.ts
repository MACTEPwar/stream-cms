import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app-services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  send() {
    const formValue = this.registerForm.getRawValue();
    if (
      this.registerForm.valid &&
      formValue.password === formValue.confirmPassword
    ) {
      this.authService.registration$(formValue).subscribe({
        next: (res) => {
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
}
