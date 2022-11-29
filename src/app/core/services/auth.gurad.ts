import { AuthService } from 'src/app/components/authentication/services/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from 'src/app/components/authentication/models/user.model';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.userValue;

        if (currentUser) {
        //    if(route.data?.['role'] && route.data?.['role'].some((authority: string) => currentUser.user.role === authority)) {
        //         return true;
        //     } 
        //    else {
        //     // TO-DO  navigate to unauthroized
        //     console.log("AUTH ELSE")
        //     this.router.navigate(['hello'])
        //     return true;
        //    }

            return true;
        } 

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
