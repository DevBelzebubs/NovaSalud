import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { user } from '../../models/user';
import { patient } from '../../models/patient';
import { doctor } from '../../models/doctor';

@Component({
  selector: 'app-register',
  imports: [TopBarComponent,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!:FormGroup;
  constructor(private fb:FormBuilder) {}
  usuariosRegistrados: (user | patient | doctor)[] = [];
  ngOnInit(){
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      numero: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      sexo: ['', Validators.required]
    });
  }
  onRegister(){
    if(this.registerForm.valid){
      const data = this.registerForm.value;
      const newUser = new user(
      this.getRandomId(),
      data.username,
      data.password,
      data.nombre,
      data.apellido,
      data.dni,
      data.numero,
      data.sexo,
      data.rol,
      data.status
    );
    let newEntity:user | patient | doctor;
    if(data.rol === 'paciente'){
      newEntity = new patient(this.getRandomId(),newUser,0,0);
    }else if(data.rol === 'doctor'){
      newEntity = new doctor();
    }else{
      newEntity = newUser;
    }
    if(newEntity){
      this.usuariosRegistrados.push(newEntity);
      this.registerForm.reset();
      console.log(this.usuariosRegistrados);
      console.log(newEntity);
      alert('Usuario registrado con éxito');
    }

    }
  }
  getRandomId(): number {
  return Math.floor(Math.random() * 10000);
}
}
