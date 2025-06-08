import { Component, EventEmitter, Output } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [TopBarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  nombreUsuario = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      rol: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log({ username, password });
      this.authService.login(username, password).subscribe({
        next: (response) => {
          const token = response.headers.get('Authorization')?.replace('Bearer ', '');
          const userData = response.body;
          this.authService.saveToken(token || '');
          this.authService.saveUserData(userData.usuario);
          this.route.navigate(['/']);
          this.authService.saveUserData(userData.usuario);
        },
        error: (error) => {
          console.error('Error during login:', error);
          alert('Login failed. Please check your credentials.');
        },
      });
    }
  }
}
