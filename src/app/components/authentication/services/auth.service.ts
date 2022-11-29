import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import { Account } from "../models/account.model";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { Login } from "../models/login.model";
import {environment} from "../../../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {JhiEventManager} from "ng-jhipster";
import { UserIdleModule, UserIdleService } from "angular-user-idle";
import {ErrorHandlerService} from "../../../core/services/error-handler.service";
import {ApplicationConstants} from "../../../core/application.constants";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<Account | null>;
    public user: Observable<Account | null>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private eventManager: JhiEventManager,
        private userIdle: UserIdleService,
        private errorHandlerService: ErrorHandlerService
    ) {
        // @ts-ignore
        this.userSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    login(credentials: Login): Observable<Account> {
        return this.http.post<any>(`${environment.apiUrl}token/create`, credentials)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user.data));
                this.userSubject.next(user.data);
                return user.data;
            }), catchError(this.errorHandlerService.handleError));
    }
    handleLogout(actionFrom: String): void {
        localStorage.removeItem('user');
        if (actionFrom !== ApplicationConstants.BACKEND) {
            this.emitLogoutSuccessEvent()
        }
        this.userSubject.next(null);
        this.userIdle.stopTimer()
        this.router.navigate(['/']);
    }
    logout(actionFrom: string): void {
        // remove user from local storage to log user out
        if (actionFrom == ApplicationConstants.FRONTEND) {
             this.http.delete(`${environment.apiUrl}token/destroy`).subscribe(() => {
                this.handleLogout(actionFrom);
            }, error => {
                this.errorHandlerService.handleError(error);
            })
        } else {
            this.handleLogout(actionFrom);
        }

    }
    emitLogoutSuccessEvent(): void {
        this.eventManager.broadcast({
            name: 'logoutSuccess',
            content: 'Sending logout Success'
        });
    }
    public get userValue(): Account | null{
        return this.userSubject.value;
    }
    // hasAnyAuthority(authorities: string[] | string): boolean {
    //     if (!this.userValue || !this.userValue.userRoles) {
    //         return false;
    //     }
    //     if (!Array.isArray(authorities)) {
    //         authorities = [authorities];
    //     }
    //     return this.userValue.userRoles.some((authority: string) => authorities.includes(authority));
    // }

    redirectToUnauthorized(): void {
        this.router.navigate(['unauthorized']);
    }

}
