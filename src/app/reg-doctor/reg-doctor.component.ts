import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { DoctorServiceService } from '../doctor-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { doctor } from '../../models/doctor';
import { user } from '../../models/user';
import { speciality } from '../../models/speciality';
@Component({
  selector: 'app-reg-doctor',
  imports: [ReactiveFormsModule],
  templateUrl: './reg-doctor.component.html',
  styleUrl: './reg-doctor.component.css'
})
export class RegDoctorComponent {
    doctorForm!:FormGroup;
    constructor(private fb:FormBuilder,private doctorService:DoctorServiceService){}
    ngOnInit(){
      this.doctorForm = this.fb.group({
          nombreUsuario:['',Validators.required],
          nombre: ['',Validators.required],
          apellido:['',Validators.required],
          password:['',Validators.required],
          numero:['',Validators.required],
          sexo:['',Validators.required],
          especialidad:['',Validators.required],
          horarioAtencion:['',Validators.required]
      })
    }
    onRegister(){
      if(this.doctorForm.valid){
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
        const specialities = new speciality(undefined,formData.especialidad);
        const newDoctor = new doctor(
          undefined,
          doctorUser,
          specialities,
          formData.horarioAtencion
        );
        console.log(JSON.stringify(doctorUser));
        this.doctorService.addDoctor(newDoctor).subscribe({
          next: () =>{
            console.log("Doctor registrado con éxito")
          },
          error: (err) =>{
            console.log("Error: " + err); 
            console.log(JSON.stringify(doctorUser));
          }
        })
      }
    }
}
