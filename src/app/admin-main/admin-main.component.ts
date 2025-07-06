import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../../services/speciality-service.service';
import { Form, FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { speciality } from '../../models/speciality';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { AuthService } from '../../services/auth.service';
import {} from 'sweetalert2'
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
    next: (registerSpeciality) => {
      Swal.fire({
        icon: 'success',
        title: 'Especialidad registrada',
        text: 'La especialidad fue registrada exitosamente.',
        confirmButtonText: 'Aceptar'
      });
      this.listSpeciality();
      this.formSpeciality.reset();
    },
    error: (err) => {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar la especialidad.',
        confirmButtonText: 'Cerrar'
      });
      this.listSpeciality();
    }
  });
  }
  startEditSpeciality(id?: number) {
  if (id == null) {
    alert("ID no válido");
    return;
  }

  this.specilityForm = true;
  this.isEditing = true;
  this.editId = id;

  this.specialityService.getSpeciality(id).subscribe({
    next: (data) => {
      console.log('Respuesta del backend:', data);
      
      if (Array.isArray(data) && data.length > 0) {
        const especialidad = data[0];
        this.formSpeciality.patchValue({
          name: especialidad.nombre,
          speciality: especialidad.descripcion
        });
        setTimeout(() => {
        const formElement = document.getElementById('formSpeciality');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      } else {
        Swal.fire({
          title: 'No encontrado',
          text: 'No se encontró la especialidad solicitada.',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    },
    error: (error) => {
      console.error("Error al cargar especialidad:", error);
      alert("No se pudo cargar la especialidad para editar");
    }
  });
}



saveEditSpeciality() {
  if (this.editId == null) {
    Swal.fire({
      title: 'ID inválido',
      text: 'ID de edición no válido.',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
    return;
  }

  if (!this.formSpeciality.valid) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Completa todos los campos requeridos.',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    });
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
      Swal.fire({
        title: '¡Éxito!',
        text: 'Especialidad actualizada correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
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
        Swal.fire({
          title: 'Error de validación',
          text: mensaje,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          title: 'Error inesperado',
          text: 'Ocurrió un error al actualizar la especialidad.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
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