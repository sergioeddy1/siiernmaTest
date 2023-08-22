import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DGService } from '../../services/dg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Escalas, Products } from '../../interfaces/product.interface';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, of, startWith, switchMap, map  } from 'rxjs';
import { FormControl } from '@angular/forms';



interface CheckboxesState {
  [key: string]: boolean;
}


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit{


 searchFormControl: FormControl = new FormControl();


   // Observable para los productos filtrados
  filteredProducts$: Observable<Products[]> = of([]);
  public showSuggestions = false;

  public products: Products[] = [];
  public escalas: Escalas[]=[];
  public productsById: Products[] = [];
  formatoMostrado: boolean = false;

  checkboxesState: CheckboxesState = {
    prodgeografico: false,
    prodestadistico: false,

    cobeNacional: false,
    cobeEstatal: false,
    cobeMunicipal: false,
    cobRegional: false,

    typeDatoGeo: false,
    typeTabulado: false,
    typePublicacion: false,

    dggma: false,
    dgee: false,
    dges: false,
    dgiai: false,
    dgegspj: false,
  };

  filteredProducts: Products[] = [];
  showFilteredProducts = false;


  constructor(
    private _direServices: DGService,
    private _router: Router,
    private _leeLink: ActivatedRoute,
    private _eref: ElementRef
  ){
    this.searchFormControl = new FormControl('');
  }


  ngOnInit(): void {

    this.filteredProducts$ = this.searchFormControl.valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(value => {
    const inputValue = value !== null && value !== undefined ? value : '';
    return this._direServices.getSuggestions(inputValue);
  })
);

    this._direServices.getEscalas()
    .subscribe( escala => this.escalas = escala)

    this._direServices.getProducts()
    .subscribe(data => this.products = data )


    this._leeLink.params
    .pipe(
      switchMap(({ by }) =>{
        if (by === '1') {
        this.checkboxesState['dggma'] = true;
      } else if (by === '2') {
        this.checkboxesState['dgee'] = true;
      } else if (by === '3') {
        this.checkboxesState['dges'] = true;
      } else if (by === '4') {
        this.checkboxesState['dgiai'] = true;
      } else if (by === '5') {
        this.checkboxesState['dgegspj'] = true;
      }
        return this._direServices.getSecuenciaProductBy(by)
      } )
    )
    .subscribe( data => {
      this.productsById = data;
      this.applyFilters();
    })

  }

  //función que cambia el id por el string que le corresponde
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

  //función para collapse card
  expandedIndex: number | null = null;
  toggleCollapse(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  //función que detecta los cambios en los checks box
  handleCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const checkboxId = target.id;
    this.checkboxesState[checkboxId] = target.checked;
    this.applyFilters(); // Si es otro checkbox, aplicar los filtros según los checkboxes seleccionados
  }

  allFalse(): void {
  this.checkboxesState = {
    prodgeografico: false,
    prodestadistico: false,

    cobeNacional: false,
    cobeEstatal: false,
    cobeMunicipal: false,
    cobRegional: false,

    typeDatoGeo: false,
    typeTabulado: false,
    typePublicacion: false,


  };
  this.showFilteredProducts = false;

  this.ngOnInit();
}

  applyFilters(): void {


  this.showFilteredProducts = false; // Inicialmente, asumimos que no se muestran productos filtrados
  this.filteredProducts = this.productsById; // Establecemos los productos filtrados como todos los productos disponibles

  if (
    this.checkboxesState['prodgeografico'] ||
    this.checkboxesState['prodestadistico'] ||
    this.checkboxesState['cobeNacional'] ||
    this.checkboxesState['cobeEstatal'] ||
    this.checkboxesState['cobeMunicipal'] ||
    this.checkboxesState['cobRegional'] ||
    this.checkboxesState['typeDatoGeo'] ||
    this.checkboxesState['typeTabulado'] ||
    this.checkboxesState['typePublicacion']

  ) {
    // Si al menos un checkbox está activo, activamos el flag showFilteredProducts
    this.showFilteredProducts = true;

    this.filteredProducts = this.productsById.filter(product => {

      // Dentro de este filtro, solo mantener los productos que cumplan todas las condiciones de los checkboxes

      const passTypeFilter =
        (!this.checkboxesState['prodgeografico'] || (this.checkboxesState['prodgeografico'] && product.tipo_prod__1 === 1)) &&
        (!this.checkboxesState['prodestadistico'] || (this.checkboxesState['prodestadistico'] && product.tipo_prod__2 === 1));

      const passCoberturaFilter =
        (!this.checkboxesState['cobeNacional'] || (this.checkboxesState['cobeNacional'] && product.cobertura_geo__1 === 1)) &&
        (!this.checkboxesState['cobeEstatal'] || (this.checkboxesState['cobeEstatal'] && product.cobertura_geo__2 === 1)) &&
        (!this.checkboxesState['cobeMunicipal'] || (this.checkboxesState['cobeMunicipal'] && product.cobertura_geo__3 === 1)) &&
        (!this.checkboxesState['cobRegional'] || (this.checkboxesState['cobRegional'] && product.cobertura_geo__4 === 1));

      const passTipoSoporteFilter =
        (!this.checkboxesState['typeDatoGeo'] || (this.checkboxesState['typeDatoGeo'] && product.tipo_soporte__1 === 1)) &&
        (!this.checkboxesState['typeTabulado'] || (this.checkboxesState['typeTabulado'] && product.tipo_soporte__2 === 1)) &&
        (!this.checkboxesState['typePublicacion'] || (this.checkboxesState['typePublicacion'] && product.tipo_soporte__3 === 1));


      // Combina los resultados de los filtros de tipo y cobertura
      return passTypeFilter && passCoberturaFilter && passTipoSoporteFilter;
    });


  }

}
















}
