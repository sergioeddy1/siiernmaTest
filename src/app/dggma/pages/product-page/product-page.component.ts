import { Component, OnInit } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { Router } from '@angular/router';
import { Escalas, Products } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{

  public products: Products[] = [];
  public escalas: Escalas[]=[];

  constructor(
    private _direServices: DGService,
    private _router: Router
  ){}

  ngOnInit(): void {

    this._direServices.getEscalas()
    .subscribe( escala => this.escalas = escala)

    this._direServices.getProducts()
    .subscribe( products => this.products = products );


  }
  getEscalasText(indicador_ps: number): string {
  let escalasText = '';
  for (let escalas of this.escalas) {
    if (escalas.id === indicador_ps) {
      escalasText = escalas.text;
      break;
    }
  }
  return escalasText;
}

   goBack():void{
    this._router.navigateByUrl('/product')
  }

}
