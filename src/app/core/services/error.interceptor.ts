import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/components/authentication/services/auth.service';
import {ApplicationConstants} from "../application.constants";
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if([401, 403].indexOf(err.status)!== -1 ) {
            //  this.authService.logout(ApplicationConstants.BACKEND, this.authService.userID);
             location.reload();
            } 
            // else if([403].indexOf(err.status)!== -1) {
            //     this.router.navigate(['unauthorized'])
            // } 
            const error = err.error.message;
        
            return throwError(error);
        }))

    }
}
