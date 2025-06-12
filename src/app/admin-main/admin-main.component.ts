import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { Router } from '@angular/router';
import { SpecialityServiceService } from '../speciality-service.service';
import { Form, FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { speciality } from '../../models/speciality';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-admin-main',
  imports: [TopBarComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-main.component.html',
  styleUrl: './admin-main.component.css'
})
export class AdminMainComponent {
  specialities:speciality[] = [];
  specilityForm:boolean = false;
  formSpeciality!:FormGroup
  constructor(private route:Router, private specialityService:SpecialityServiceService, private fb:FormBuilder){}
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
}
