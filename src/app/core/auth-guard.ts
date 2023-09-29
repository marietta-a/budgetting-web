import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateChildFn, CanActivateFn, Route, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service";

@Injectable({providedIn: 'root'})
export class AuthGuard{
    constructor(private authService: AuthService){

    }


    canActivateChild: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return this.authService.isAuthenticated();
    }

    canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return this.authService.isAuthenticated();
    }

    // canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return true;
    // }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     return true;
    // }

}