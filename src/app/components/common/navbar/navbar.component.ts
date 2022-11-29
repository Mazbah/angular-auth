import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { Account } from '../../authentication/models/account.model';
import {ApplicationConstants} from "../../../core/application.constants";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Account | null | undefined
  isAuthenticated: boolean = false;
  constructor(
      private accountService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuthenticationDetails()
  }

  getAuthenticationDetails(): void {
    this.user = this.accountService.userValue;
    if (this.user) {
      this.isAuthenticated = true;
    }
  }
  logOut(): void {
    this.accountService.logout(ApplicationConstants.FRONTEND)
  }
}
