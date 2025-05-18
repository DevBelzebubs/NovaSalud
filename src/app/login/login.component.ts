import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [TopBarComponent,FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      rol: ['', Validators.required],
      username: ['',Validators.required],
      password: ['', Validators.required],
    });
  }
  onLogin(){
    if(this.loginForm.valid){

    }else{
      alert("Please fill all the fields");
    }
  }
}
