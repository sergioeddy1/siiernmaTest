import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DggmaRoutingModule } from './dggma-routing.module';
import { DgComponent } from './pages/dg/dg.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ByidsComponent } from './pages/byids/byids.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DgComponent,
    LayoutPageComponent,
    ProductPageComponent,
    NewPageComponent,
    SearchPageComponent,
    ByidsComponent
  ],
  imports: [
    CommonModule,
    DggmaRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class DggmaModule { }
