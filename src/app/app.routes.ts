import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeMainComponent } from './home-main/home-main.component';

export const routes: Routes = [
    {path:'',component:HomeMainComponent},
    {path:'login',component:LoginComponent}
];
