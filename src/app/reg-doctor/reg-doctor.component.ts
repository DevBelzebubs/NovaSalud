import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { DoctorServiceService } from '../doctor-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { doctor } from '../../models/doctor';
import { user } from '../../models/user';
import { speciality } from '../../models/speciality';
import { SpecialityServiceService } from '../speciality-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reg-doctor',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './reg-doctor.component.html',
  styleUrl: './reg-doctor.component.css'
})
export class RegDoctorComponent {
    doctorForm!:FormGroup;
    especialidades:speciality[] = [];
    constructor(private fb:FormBuilder,private doctorService:DoctorServiceService,private specialityService:SpecialityServiceService,private route:Router){}
    ngOnInit(){
      this.doctorForm = this.fb.group({
          nombreUsuario:['',Validators.required],
          nombre: ['',Validators.required],
          apellido:['',Validators.required],
          password:['',Validators.required],
          numero:['',Validators.required],
          sexo:['',Validators.required],
          especialidad:['',Validators.required],
          
      })
      this.specialityService.listSpeciality().subscribe(data =>{
          this.especialidades = data;
        })
    }
    onRegister() {
    const formData = this.doctorForm.value;
    const doctorUser = new user(
      undefined,
      formData.nombreUsuario,
      formData.password,
      formData.nombre,
      formData.apellido,
      formData.numero,
      formData.sexo,
    )
    const especialidadSeleccionada = new speciality(formData.especialidad);
    const newDoctor = new doctor(
      undefined,
      doctorUser,
      especialidadSeleccionada
    );
    console.log(JSON.stringify(newDoctor));
    this.doctorService.addDoctor(newDoctor).subscribe({
      next: () => {
        console.log("Doctor registrado con éxito")
        Swal.fire({
          title: 'Doctor registrado con éxito',
          text: 'El doctor ha sido registrado con éxito',
          icon: 'success',
        });
        this.route.navigate(['/']);
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    })
  }
  exit() {
    this.route.navigate(['/admin']);
  }
}
