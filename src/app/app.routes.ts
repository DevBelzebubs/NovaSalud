import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { RegisterAppointmentComponent } from './register-appointment/register-appointment.component';
import { PagoComponent } from './pago/pago.component';
import { HistorialCitasComponent } from './historial-citas/historial-citas.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorMainComponent } from './doctor-main/doctor-main.component';
import { DoctorRegisterComponent } from './doctor-register/doctor-register.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RegDoctorComponent } from './reg-doctor/reg-doctor.component';
import { RegRecepcionistComponent } from './reg-recepcionist/reg-recepcionist.component';

export const routes: Routes = [
    {path:'',component:HomeMainComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'citas',component:RegisterAppointmentComponent, canActivate:[AuthGuard], data: { roles:['ROL_PACIENTE']} },
    {path:'pago',component:PagoComponent, canActivate:[AuthGuard], data: { roles:['ROL_PACIENTE']} },
    {path:'historial',component:HistorialCitasComponent, canActivate:[AuthGuard], data: { roles:['ROL_PACIENTE']} },
    {path:'doctor',component:DoctorMainComponent, canActivate:[AuthGuard], data: { roles:['ROL_DOCTOR']} },
    {path:'registrar-horario',component:DoctorRegisterComponent, canActivate:[AuthGuard], data: { roles:['ROL_DOCTOR']} },
    {path:'admin',component:AdminMainComponent, canActivate:[AuthGuard], data: { roles:['ROL_ADMIN']} },
    {path:'registrar-doctor',component:RegDoctorComponent, canActivate:[AuthGuard], data: { roles:['ROL_ADMIN']} },
    {path:'registrar-recepcionista',component:RegRecepcionistComponent, canActivate:[AuthGuard], data: { roles:['ROL_ADMIN']} },
];
