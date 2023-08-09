import { Component, OnInit } from '@angular/core';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { DGService } from '../../services/dg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dg',
  templateUrl: './dg.component.html',
  styleUrls: ['./dg.component.css']
})
export class DgComponent implements OnInit{

  public dgs: UAdmin[] = [];

  constructor(
    private _direServices: DGService,
    private _router: Router
  ){}

  ngOnInit(): void {

    this._direServices.getDG()
    .subscribe( dgs => this.dgs = dgs );


  }

   goBack():void{
    this._router.navigateByUrl('/product')
  }

}
