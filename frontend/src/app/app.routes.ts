/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'auth/callback', component: CallbackComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
];
