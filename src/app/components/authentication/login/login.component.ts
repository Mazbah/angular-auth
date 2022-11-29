import {Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {environment} from 'src/environments/environment';
import { AuthService} from "../services/auth.service";
import {JhiEventManager} from "ng-jhipster";
import { Account } from '../models/account.model';
import { ApplicationConstants } from 'src/app/core/application.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  form: any;
  formSubmitted: boolean = false;
  errorOccurred: boolean = false;
  user: Account | null | undefined;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private eventManager: JhiEventManager,
  ) { }

  setSession(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  ngOnInit(): void {
    if(this.auth.userValue) {
      this.router.navigate(['']);
    }
    this.form = this.formBuilder.group({
      user_id: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });

    if(window.sessionStorage){
      sessionStorage.setItem('firstLoad', 'YES');
    }
  }

  isAuthenticated(): boolean {
    this.user = this.auth.userValue;
    return this.user ? true : false;
  }

  loginProcess(){
    this.formSubmitted = true;
    this.auth.login({
      user_id: this.form.get('user_id')!.value,
      password: this.form.get('password')!.value,
    }).subscribe(
        response => {
          this.formSubmitted = false;
          this.errorOccurred = false;
          console.log(response);
          console.log("YES 1")
          
          this.user = this.auth.userValue;
          if(this.user?.user){
            this.auth.handleLogout(ApplicationConstants.COMMON)
            this.messageService.add({
              key: 'toast-key', severity: 'error', summary: 'Access Denied',
              detail: 'Only for Admin Users!'
            });
          }
          else{
            this.emitLoginSuccessEvent()
            
            this.router.navigate(['dashboard/all-courses']);
            console.log(this.user)
            // const redirectUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
            // this.router.navigate([redirectUrl]);
          }
        },
        error => {
          this.formSubmitted = false;
          this.errorOccurred = true;
          this.messageService.add({
            key: 'toast-key', severity: 'error', summary: 'Authentication Failed',
            detail: 'User Authentication Failed!'
          });
          console.log(this.messageService);
        }
    )
  }

  toHomePage(){
    this.router.navigateByUrl('dashboard/all-courses');
  }

  emitLoginSuccessEvent(): void {
    this.eventManager.broadcast({
      name: 'authenticationSuccess',
      content: 'Sending Login Success'
    });
  }

}
