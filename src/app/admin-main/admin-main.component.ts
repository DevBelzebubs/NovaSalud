import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../speciality-service.service';
import { Form, FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { speciality } from '../../models/speciality';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { AuthService } from '../auth.service';
import {} from 'sweetalert2'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-main',
  imports: [TopBarComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  specialities:speciality[] = [];
  specilityForm:boolean = false;
  formSpeciality!:FormGroup
  isEditing:boolean = false;
  editId:number | null = null;
  constructor(private route:Router, private specialityService:SpecialityServiceService, private fb:FormBuilder, private authService:AuthService){}
  doctorRegister(){
    this.route.navigate(['/registrar-doctor']);
  }
  recepcionistRegister(){
    this.route.navigate(['/registrar-recepcionista']);
  }
  ngOnInit() {
    this.listSpeciality();
    this.formSpeciality = this.fb.group({
      name: ['',Validators.required],
      speciality: ['',Validators.required]
    })
  }
  deleteSpeciality(id?:number){
    if (id == null) {
    alert("ID no válido");
    return;
  }
    this.specialityService.deleteSpeciality(id).subscribe({
      next: (data)=>{
        this.listSpeciality()

      },
      error: (err)=>{
        this.listSpeciality();
      }
    });
  }
  toggleForm():boolean{
    return this.specilityForm = !this.specilityForm;
  }
  listSpeciality(){
    this.specialityService.listSpeciality().subscribe({
      next: (data) => {
        this.specialities = data;
      },
      error: (error) => {
        console.error("Error fetching specialities:", error);
      }
    })
  }
  addSpeciality(){
    const formData = this.formSpeciality.value;
    const specialities = new speciality(
      undefined,
      formData.name,
      formData.speciality
    )
    this.specialityService.addSpeciality(specialities).subscribe({
      next: (registerSpeciality) =>{
        console.log(registerSpeciality);
        console.log(JSON.stringify(registerSpeciality));
        this.listSpeciality();
        this.formSpeciality.reset();
      },
      error: (err) =>{
        console.error(err);
        this.listSpeciality();
      }
    });
  }
  startEditSpeciality(id?: number) {
  if (id == null) {
    alert("ID no válido");
    return;
  }
  this.specialityService.getSpeciality(id).subscribe({
    next: (data) => {
      this.formSpeciality.patchValue({
        name: data.nombre,
        speciality: data.descripcion
      });
      this.isEditing = true;
      this.editId = id;
      this.specilityForm = true;
      setTimeout(() => {
        const formElement = document.getElementById('formSpeciality');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    error: (error) => {
      console.error("Error al cargar especialidad:", error);
      alert("No se pudo cargar la especialidad para editar");
    }
  });
}

saveEditSpeciality() {
  if (this.editId == null) {
    alert("ID de edición no válido");
    return;
  }
  if (!this.formSpeciality.valid) {
    alert("Completa todos los campos requeridos.");
    return;
  }
  const formData = this.formSpeciality.value;
  const editedSpeciality = new speciality(
    this.editId,
    formData.name,
    formData.speciality
  );
  this.specialityService.editSpeciality(this.editId, editedSpeciality).subscribe({
    next: (data) => {
      alert("Especialidad actualizada correctamente");
      this.listSpeciality();
      this.formSpeciality.reset();
      this.isEditing = false;
      this.specilityForm = false;
      this.editId = null;
    },
    error: (error) => {
      console.error("Error actualizando especialidad:", error);
      if (error.status === 400 && error.error) {
        let mensaje = '';
        for (const key in error.error) {
          mensaje += `${key}: ${error.error[key]}\n`;
        }
        alert(mensaje);
      } else {
        alert("Error inesperado");
      }
    }
  });
}

  editSpeciality(id?:number){
    if (id == null) {
      alert("ID no válido");
      return;
    }
    this.specialityService.editSpeciality(id, this.formSpeciality.value).subscribe({
      next: (data) => {
        this.formSpeciality.patchValue({
          name: data.name,
          speciality: data.speciality
        });
        this.specilityForm = true;
      },
      error: (error) => {
        console.error("Error fetching speciality:", error);
      }
    });
  }
}