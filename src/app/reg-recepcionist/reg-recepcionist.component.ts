import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule,FormGroup, Form, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { recepcionist } from '../../models/recepcionist';
import { RecepcionistServiceService } from '../recepcionist-service.service';
import { user } from '../../models/user';
@Component({
  selector: 'app-reg-recepcionist',
  standalone:true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './reg-recepcionist.component.html',
  styleUrl: './reg-recepcionist.component.css',
})
export class RegRecepcionistComponent {
  receptionistForm!:FormGroup;
  constructor(private route:Router, private recepcionistService:RecepcionistServiceService, private fb:FormBuilder){}
  exit() {
    this.route.navigate(['/admin']);
  }
  ngOnInit(){
    this.receptionistForm = this.fb.group({
      nombreUsuario:['',Validators.required],
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      numero:['',Validators.required],
      password:['',Validators.required],
      sexo:['',Validators.required]
    })
  }
  onRegister() {
  const formData = this.receptionistForm.value;

  const newReceptionist = new recepcionist(
    undefined,
    formData.nombreUsuario,
    formData.nombre,
    formData.apellido,
    formData.password,
    formData.numero,
    formData.sexo
  );
  this.recepcionistService.addReceptionist(newReceptionist).subscribe({
    next: () => {
      console.log("Recepcionista registrado con éxito");
      this.route.navigate(['/admin']);
    },
    error: (err) => {
      console.error("Error al registrar recepcionista:", err);
    }
  });
}

}
