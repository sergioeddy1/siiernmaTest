import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ByidsComponent } from './pages/byids/byids.component';
import { DgComponent } from './pages/dg/dg.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'dg', component: DgComponent},
      { path: 'content/:by', component: ProductPageComponent},
      { path: 'search', component: SearchPageComponent},
      { path: 'new', component: NewPageComponent},
      { path: 'by/:id', component: ByidsComponent},
      { path: '**', redirectTo: 'dg' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DggmaRoutingModule { }
