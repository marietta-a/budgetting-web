import { ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { mgr } from "./auth-config";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService{
    constructor(private router: Router){

    }
    async isAuthenticated() : Promise<boolean>{
        var user = await mgr.getUser();
        console.log(user);
        if(user?.access_token){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}

export const canActivateChild: CanActivateChildFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    var user = await mgr.getUser();
    console.log(user);
    if(user?.access_token){
        return true;
    }
    route.routeConfig.redirectTo = "login";
    return false;
}

export const canActivate: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    var user = await mgr.getUser();
    console.log(user);
    if(user?.access_token){
        return true;
    }
    route.routeConfig.redirectTo = "login";
    return false;
}