import { Component } from '@angular/core';
import { appointment } from '../../models/appointment';
import { patient } from '../../models/patient';
import { user } from '../../models/user';
import { doctor } from '../../models/doctor';
import { HomeMainComponent } from "../home-main/home-main.component";
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../../services/speciality-service.service';
import { PatientServiceService } from '../../services/patient-service.service';
import { DoctorServiceService } from '../../services/doctor-service.service';
import { CitaMedicaDto } from '../dtos/citaMedicaDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { medicine } from '../../models/medicine';
import { MedicineServiceService } from '../../services/medicine-service.service';
import { GestionCitaDto } from '../dtos/gestionCitaDto';
import { MedicamentoSeleccionado } from '../interfaces/medicamentoSeleccionado';
import { Medicamento } from '../interfaces/medicamento';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-doctor-main',
  imports: [HomeMainComponent, TopBarComponent,CommonModule,FormsModule],
  templateUrl: './doctor-main.component.html',
  styleUrl: './doctor-main.component.css'
})
export class DoctorMainComponent {
  citasDoctor: CitaMedicaDto[] = [];
  medicamentosSeleccionados: MedicamentoSeleccionado[] = [];
  listMedicamentos:Medicamento[] = []
  citaSeleccionada: any=null;
  descripcionReceta: string = '';
  totalReceta: number = 0;
  constructor(private route:Router, private patientService:PatientServiceService, private doctorService:DoctorServiceService, private medicineService:MedicineServiceService){

  }
  registrarHorario(){
    this.route.navigate(['/registrar-horario'])
  }
  salir(){
      this.route.navigate(['/']);
  }
  ngOnInit(){
    this.loadCitasDoctor();
    console.log(this.citasDoctor);
  }
  loadCitasDoctor(){
    this.doctorService.listCitasByDoctor().subscribe({
      next: (data) => {
        this.citasDoctor = data;
          console.log('Citas del doctor:', this.citasDoctor);
      },
      error: (err) => {
          console.error('Error al cargar citas del doctor:', err);
      }
    })
  }
  cargarMedicamentos() {
    this.medicineService.listMedicinesDoctor().subscribe({
      next: (data) => {
        this.listMedicamentos = data;
      },
      error: (err) => {
        console.error("Error fetching medicines:", err);
      }
    });
  }
  abrirFormularioFinalizar(citasDoctor:CitaMedicaDto){
    this.citaSeleccionada = citasDoctor;
    this.descripcionReceta = ''
    this.medicamentosSeleccionados = [];
    this.cargarMedicamentos();
  }
  finalizarCita(){
    if (!this.descripcionReceta || this.medicamentosSeleccionados.length === 0) {
      alert("Debes ingresar una descripción y seleccionar al menos un medicamento");
    return;
  }
  const dto = new GestionCitaDto(
    'Finalizado',
    this.descripcionReceta,
    this.medicamentosSeleccionados.map(med => med.id)
  );
  this.doctorService.gestionCita(this.citaSeleccionada.id,dto).subscribe({
    next:(data) =>{
      Swal.fire({
        icon: 'success',
        title: 'Cita finalizada',
        text: 'La cita se finalizó exitosamente.',
        confirmButtonText: 'Aceptar'
      });
      this.citaSeleccionada = null;
      this.loadCitasDoctor();
    },
    error:(err) =>{
      console.error("Error al finalizar cita:", err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo finalizar la cita.',
        confirmButtonText: 'Cerrar'
      });
    }
  })
  }
  agregarMedicamento(med: Medicamento) {
  if (!med) return;

  const existe = this.medicamentosSeleccionados.find(m => m.id === med.id);
  if (existe) {
    alert('Este medicamento ya está agregado.');
    return;
  }

  this.medicamentosSeleccionados.push({
    id: med.id,
    nombre: med.nombre,
    precio: med.precio,
    cantidad: 1,
    subtotal: med.precio,
    stockDisponible: med.stock
  });

  this.calcularTotal();
}

incrementarCantidad(med: MedicamentoSeleccionado) {
  if (med.cantidad < med.stockDisponible) {
    med.cantidad++;
    med.subtotal = med.precio * med.cantidad;
    this.calcularTotal();
  }
}

decrementarCantidad(med: MedicamentoSeleccionado) {
  if (med.cantidad > 1) {
    med.cantidad--;
    med.subtotal = med.precio * med.cantidad;
    this.calcularTotal();
  }
}

eliminarMedicamento(med: MedicamentoSeleccionado) {
  this.medicamentosSeleccionados = this.medicamentosSeleccionados.filter(m => m.id !== med.id);
  this.calcularTotal();
}

calcularTotal() {
  this.totalReceta = this.medicamentosSeleccionados.reduce((acc, item) => acc + item.subtotal, 0);
}

}
