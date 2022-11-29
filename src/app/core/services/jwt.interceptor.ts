import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from "../../../environments/environment";
import { AuthService } from 'src/app/components/authentication/services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authService.userValue;
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${user?.token}`
                }
            });
        }
        console.log(request.url)

        // const httpOption = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})}

        return next.handle(request);

    }
}

// || error.status === 400 || error.status === 401
