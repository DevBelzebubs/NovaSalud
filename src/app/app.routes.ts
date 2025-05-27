import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { RegisterComponent } from './register/register.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SpecialitiesComponent } from './specialities/specialities.component';
import { RegisterAppointmentComponent } from './register-appointment/register-appointment.component';
import { PagoComponent } from './pago/pago.component';
import { HistorialCitasComponent } from './historial-citas/historial-citas.component';

export const routes: Routes = [
    {path:'',component:HomeMainComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'citas',component:RegisterAppointmentComponent},
    {path:'pago',component:PagoComponent},
    {path:'historial',component:HistorialCitasComponent}
];
