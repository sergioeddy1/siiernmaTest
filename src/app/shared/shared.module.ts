import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Page404Component } from './pages/page404/page404.component';



@NgModule({
  declarations: [
    Page404Component
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Page404Component
  ]
})
export class SharedModule { }
