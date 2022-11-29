import { Component } from '@angular/core';
import { Account } from './components/authentication/models/account.model';
import { AuthService } from './components/authentication/services/auth.service';
import { ApplicationConstants } from './core/application.constants';
import {MessageService, PrimeNGConfig} from 'primeng/api';
import { JhiEventManager } from 'ng-jhipster';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'farming-servey';
  user: Account | null | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    private messageService: MessageService,
    private auth: AuthService,
    private eventService: JhiEventManager,
    private bnIdle: BnNgIdleService
  ) {

  }

  ngOnInit(
  ) {
    this.primengConfig.ripple = true;
    this.registerAuthenticationSuccess();
    this.registerLogoutSuccess();
    // this.userIdle.onTimeout().subscribe(() => this.autoLogOut())
    this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.autoLogOut()
      }
    });
  }

  isAuthenticated(): boolean {
    return this.auth.userValue ? true : false;
  }

  registerAuthenticationSuccess(): void {
    this.eventService.subscribe('authenticationSuccess', () => {
      this.isAuthenticated()
      setTimeout(() => {
        this.messageService.add({
          key: "main-toast",
          severity: "success",
          summary: "Success",
          detail: "Logged in successfully!"
        });
      })
    });
  }

  registerLogoutSuccess(): void {
    this.eventService.subscribe('logoutSuccess', () => {
      this.isAuthenticated()
      setTimeout(() => {
        this.messageService.add({
          key: "main-toast",
          severity: "success",
          summary: "Success",
          detail: "Logged out successfully!"
        });
      })
    });
  }

  autoLogOut(): void {
    if (this.isAuthenticated()) {
      // need to optimize in params
      this.auth.logout(ApplicationConstants.FRONTEND)
    } else {
      this.bnIdle.stopTimer();
    }
  }

  showMsg(){
    this.messageService.add({
      severity: 'success',
      summary: 'summery',
      detail: 'msg detail'
    })
  }

}