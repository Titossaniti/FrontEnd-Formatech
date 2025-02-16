import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './auth/auth.guard';
import {AccountComponent} from './components/account/account.component';
import {EstablishmentsComponent} from './components/establishments/establishments.component';
import {CreateAdminComponent} from './components/create-admin/create-admin.component';
import {SessionComponent} from './components/session/session/session.component';
import {TrainerComponent} from './components/trainer/trainer/trainer.component';
import {ModuleComponent} from './components/module/module/module.component';
import {CourseComponent} from './components/course/course/course.component';

export const routes: Routes = [
  // Lazy loading pour Login car si un user est déjà connecté, il n'a pas besoin de charger le module.
  { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'establishments', component: EstablishmentsComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN'] } },
  { path: 'createAdmins', component: CreateAdminComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN'] } },
  { path: 'sessions', component: SessionComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN', 'ADMIN'] } },
  { path: 'trainers', component: TrainerComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN', 'ADMIN'] } },
  { path: 'modules', component: ModuleComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN', 'ADMIN'] } },
  { path: 'courses', component: CourseComponent, canActivate: [AuthGuard], data: { roles: ['SUPERADMIN', 'ADMIN'] } },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
