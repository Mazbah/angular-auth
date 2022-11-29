import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SideNavComponent } from './components/common/side-nav/side-nav.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService} from "primeng/api";

import { BnNgIdleService } from 'bn-ng-idle';
import { DatePipe } from '@angular/common';
import { ErrorInterceptor } from './core/services/error.interceptor';
import { JwtInterceptor } from './core/services/jwt.interceptor';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        SideNavComponent,
        LoginComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MessageModule,
      MessagesModule,
      RouterModule,
      NgxBootstrapIconsModule.pick(allIcons),
      
    ],
    providers: [
        DatePipe,
        MessageService,
        BnNgIdleService,
        ConfirmationService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
    ],
    entryComponents: [],
    bootstrap: [AppComponent],
    
})
export class AppModule { }
