import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth.service";
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private route:Router){}
    canActivate():boolean {
        if(this.authService.getToken()){
            return true;
        }else{
            this.route.navigate(['/login']);
            return false;
        }
    }
}