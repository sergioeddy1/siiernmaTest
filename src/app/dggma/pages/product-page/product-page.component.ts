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
  //? fechas para referencia
  startDate: number = 0;
  endDate: number = 0;
  //? fechas para publicaciones
  startDate2: number = 0;
  endDate2: number = 0;

  a_referenciaDesde: string[] = [];
  a_referenciaHasta: string[] = [];

  a_publicacionDesde: string[] = [];
  a_publicacionHasta: string[] = [];



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

    //! AQUÍ TODO LO DE LAS FECHAS DE REFERENCIA
    this._leeLink.params.pipe(switchMap(({ by }) =>{
        return this._direServices.getProductArrayDateREFERENCIA(by)
      })
    ).subscribe( data => {
      const uniqueYears = data.filter((year, index, self) => {
        return year.length === 4 && !isNaN(Number(year)) && self.indexOf(year) === index;
      });

      const sortedYears = uniqueYears.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(sortedYears);
      this.a_referenciaDesde = sortedYears
    });

    this._leeLink.params.pipe(switchMap(({ by }) =>{
        return this._direServices.getProductArrayDateREFERENCIAhasta(by)
      })
    ).subscribe( data => {
      const uniqueYears = data.filter((year, index, self) => {
        return year.length === 4 && !isNaN(Number(year)) && self.indexOf(year) === index;
      });

      const sortedYearsHasta = uniqueYears.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(sortedYearsHasta);
      this.a_referenciaHasta = sortedYearsHasta
    });

    //! AQUÍ TODO LO DE LAS FECHAS DE PUBLICACIÓN
    this._leeLink.params.pipe(switchMap(({ by }) =>{
        return this._direServices.getProductArrayDatePUBLICACION(by)
      })
    ).subscribe( data => {
      const uniqueYears = data.filter((year, index, self) => {
        return year.length === 4 && !isNaN(Number(year)) && self.indexOf(year) === index;
      });

      const sortedYears = uniqueYears.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(sortedYears);
      this.a_publicacionDesde = sortedYears
    });

    this._leeLink.params.pipe(switchMap(({ by }) =>{
        return this._direServices.getProductArrayDatePUBLICACIONhasta(by)
      })
    ).subscribe( data => {
      const uniqueYears = data.filter((year, index, self) => {
        return year.length === 4 && !isNaN(Number(year)) && self.indexOf(year) === index;
      });

      const sortedYearsHasta = uniqueYears.sort((a, b) => parseInt(a) - parseInt(b));
      console.log(sortedYearsHasta);
      this.a_publicacionHasta = sortedYearsHasta
    });



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
  this.startDate  = 0;
  this.endDate = 0;
  this.startDate2  = 0;
  this.endDate2 = 0;

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
  this.filterProductsByDateRangeReferencia();
  this.filterProductsByDateRangePublicacion();
}


  filterProductsByDateRangeReferencia(): void {
    if (this.startDate && this.endDate) {
      this.showFilteredProducts = true;
    this.filteredProducts = this.filteredProducts.filter(product => {
      const publicationYear = parseInt(product.a_referencia.toString());
      const publicationYear2 = product.a_referencia ? parseInt(product.a_referencia.toString()) : this.endDate + 1;
      return publicationYear >= this.startDate && publicationYear2 <= this.endDate;
    });

    console.log(this.filteredProducts)
  }
  }

  filterProductsByDateRangePublicacion(): void {
    if (this.startDate2 && this.endDate2) {
      this.showFilteredProducts = true;
    this.filteredProducts = this.filteredProducts.filter(product => {
      const publicationYear = parseInt(product.a_publicacion.toString());
      const publicationYear2 = product.a_publicacion ? parseInt(product.a_publicacion.toString()) : this.endDate2 + 1;
      return publicationYear >= this.startDate2 && publicationYear2 <= this.endDate2;
    });

    console.log(this.filteredProducts)
  }
  }


















}
