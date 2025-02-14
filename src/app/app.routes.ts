import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {AccountComponent} from './components/account/account.component';
import {EstablishmentsComponent} from './components/establishments/establishments/establishments.component';

export const routes: Routes = [
  // Lazy loading pour Login car si un user est déjà connecté, il n'a pas besoin de charger le module.
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'establishments', component: EstablishmentsComponent },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
