import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './shared/pages/page404/page404.component';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),

  },
  {
    path: 'dg', loadChildren: () => import('./dggma/dggma.module').then( m => m.DggmaModule ),

  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: '',
    redirectTo: 'dg',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
