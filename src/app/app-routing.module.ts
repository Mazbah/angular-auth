import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';

const routes: Routes = [
  { path:'login', component: LoginComponent, pathMatch: 'full'},
  
  { path:'**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
