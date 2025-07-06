import { Component } from '@angular/core';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { medicine } from '../../models/medicine';
import { MedicineServiceService } from '../../services/medicine-service.service';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recepcionist-main',
  imports: [TopBarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './recepcionist-main.component.html',
  styleUrl: './recepcionist-main.component.css',
})
export class RecepcionistMainComponent {
  medicines: medicine[] = [];
  formMedicine!: FormGroup;
  isEditing = false;
  medicineForm: boolean = false;
  editId: number | null = null;
  constructor(
    private medicineService: MedicineServiceService,
    private fb: FormBuilder
  ) {
    this.listMedicines();
  }
  listMedicines() {
    this.medicineService.listMedicines().subscribe({
      next: (data) => {
        this.medicines = data;
      },
      error: (err) => {
        console.error('Error fetching specialities:', err);
      },
    });
  }
  ngOnInit() {
    this.formMedicine = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date_entry: ['', Validators.required],
      expiration_date: ['', Validators.required],
      quantity: ['', Validators.required],
      unit_price: ['', Validators.required],
    });
  }
  getMedicineByID(id?: number) {
    this.medicineService.getMedicine(id).subscribe({
      next: (data) => {
        this.formMedicine.patchValue({
          name: data.nombre,
          description: data.descripcion,
          date_entry: data.fecha_ingreso,
          expiration_date: data.fecha_ingreso,
          quantity: data.cantidad,
          unit_price: data.precio_unitario,
        });
        this.isEditing = true;
        this.editId = id ?? null;
        this.medicineForm = true;
        setTimeout(() => {
          const formElement = document.getElementById('formMedicine');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      },
      error: (error) => {
        console.error('Error al cargar especialidad:', error);
        alert('No se pudo cargar la especialidad para editar');
      },
    });
  }
  deleteMedicine(id?: number) {
    if (id == null) {
      Swal.fire({
        title: 'ID inválido',
        text: 'ID no válido.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el medicamento de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicineService.deleteMedicine(id).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El medicamento ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            this.listMedicines();
          },
          error: () => {
            this.listMedicines();
          },
        });
      }
    });
  }

  toggleForm() {
    return (this.medicineForm = !this.medicineForm);
  }
  addMedicine() {
    const formData = this.formMedicine.value;

    const medicineDto = {
      id: null,
      nombre: formData.name,
      descripcion: formData.description,
      cantidad: formData.quantity,
      fecha_ingreso: formData.date_entry,
      fecha_vencimiento: formData.expiration_date,
      precio_unitario: formData.unit_price,
    };

    console.log('Enviando DTO:', JSON.stringify(medicineDto));

    this.medicineService.addMedicine(medicineDto).subscribe({
      next: () => {
        this.listMedicines();
        this.formMedicine.reset();
        Swal.fire({
          title: 'Medicina registrada',
          text: 'Se registró la medicina en el sistema',
          icon: 'success',
        });
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar medicamento',
          icon: 'error',
        });
      },
    });
  }
  editMedicine() {
    const formData = this.formMedicine.value;
    const editedMedicine = {
      id: this.editId,
      nombre: formData.name,
      descripcion: formData.description,
      cantidad: formData.quantity,
      fecha_ingreso: formData.date_entry,
      fecha_vencimiento: formData.expiration_date,
      precio_unitario: formData.unit_price,
    };
    this.medicineService.editMedicine(this.editId, editedMedicine).subscribe({
      next: () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Medicamento actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        this.listMedicines();
        this.isEditing = false;
        this.medicineForm = false;
        this.editId = null;
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar el medicamento.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }
}
