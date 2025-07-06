import { Component, EventEmitter, Output } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
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
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log("IMPRIMIR LOGIN")
        console.log(response.body.usuario)
        console.log(response.body)
        const rol = response.body.rol;
        const token = response.body.token;
        const userData = {
          nombre: response.body.usuario,
          rol: response.body.rol,
        }
        console.log('Token recibido:', token);
        console.log('Usuario:', response.body.usuario);
        console.log('Rol:', userData.rol);

        this.authService.saveToken(token || '');
        this.authService.saveUserData(userData);
        Swal.fire({
          title: '¡Bienvenido!',
          text: `Has iniciado sesión correctamente.`,
          icon: 'success',})
        if (rol === 'ROL_ADMIN') {
          this.route.navigate(['/admin']);
        } else if (rol === 'ROL_RECEPCIONISTA') {
          this.route.navigate(['/recepcion']);
        }else if (rol === 'ROL_DOCTOR') {
          this.route.navigate(['/doctor']);
          } else {
          this.route.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error during login:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo iniciar sesión. Por favor verifica tus credenciales.',
          icon: 'error'
      });
      },
    });
  }else{
    let errorMessage = '';
    const controls = this.loginForm.controls;
    if (controls['rol'].hasError('required')) {
      errorMessage += '- Debe seleccionar un rol.<br/>';
    }
    if (controls['username'].hasError('required')) {
      errorMessage += '- El nombre de usuario es obligatorio.<br/>';
    }
    if (controls['password'].hasError('required')) {
      errorMessage += '- La contraseña es obligatoria.<br/>';
    }
    Swal.fire({
      title: 'Error en el formulario',
      html: errorMessage,
      icon: 'error'
    });
    return;
  }
}
onRegister(){
  this.route.navigate(['/register']);
}

}
