import { Component, OnInit } from '@angular/core';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { DGService } from '../../services/dg.service';
import { Router } from '@angular/router';
import { Products } from '../../interfaces/product.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DgComponent implements OnInit{

  public dgs: UAdmin[] = [];

  public productosPorDireccion: number[] = [];

  productCounts: number[] = [];




  constructor(
    private _direServices: DGService,
    private _router: Router
  ){}

  ngOnInit(): void {
     const directions = ['1','2','3','4','5']; // Agrega las direcciones que necesitas
    directions.forEach(direction => {
      this._direServices.getProductCountByDirection(direction)
        .subscribe(count => {
          this.productCounts.push(count);
        });

    });

    this._direServices.getDG()
      .subscribe(dgs => {
        this.dgs = dgs;
        console.log(this.dgs)

      });
  }



}
