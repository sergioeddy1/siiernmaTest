import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environments } from 'src/app/environments/environments';
import { Escalas, Products, SecuenciaVar } from "../interfaces/product.interface";
import { Componente, Mdea, Subcomponente, Topico } from '../interfaces/mdea.interface';
import { UAdmin } from '../interfaces/u_admin.interface';
import { DgaPprod, Pi, ProcProduccion, ProgInformacion } from '../interfaces/pi.interface';
import { Aeg2, DgaProd, SecuenciaAeg } from '../interfaces/aeg.interface';
import { MetaODS, Ods, SecuenciaOds } from '../interfaces/ods.interface';
import { IndicadoresPS2023, PS2023, SecuenciaPS } from '../interfaces/ps.interface';

@Injectable({providedIn: 'root'})
export class DGService {

  private baseUrl: string = environments.baseUrl;

  constructor(private _http: HttpClient) { }

  getDG(){
    return this._http.get<UAdmin[]>(`${ this.baseUrl}/u_admin`)
  }

  getProducts(){
    return this._http.get<Products[]>(`${ this.baseUrl}/products`)
  }

  getMdea(){
    return this._http.get<Mdea[]>(`${ this.baseUrl}/mdea`)
  }

  getComponentes(){
    return this._http.get<Componente[]>(`${ this.baseUrl}/componentes`)
  }
  getSubcomponentes(){
    return this._http.get<Subcomponente[]>(`${ this.baseUrl}/subcomponentes`)
  }
  getTopicos(){
    return this._http.get<Topico[]>(`${ this.baseUrl}/topicos`)
  }
  getMDEASById( id: string ): Observable<Mdea[]> {
    const url = `${ this.baseUrl}/mdea?interview__id=${ id }`;
    console.log(url);
    console.log(id)
    return this._http.get<Mdea[]>(url)
    .pipe(
      tap(data => console.log(data))
    );
  }
  getPIById( id: string ): Observable<Pi[]> {
    const url = `${ this.baseUrl}/pi?interview__id=${ id }`;
    console.log(url);
    console.log(id)
   return this._http.get<Pi[]>(url)
    .pipe(
      tap(data => console.log(data))
    );
  }
  getAEGById( id: string ): Observable<SecuenciaAeg[]> {
    const url = `${ this.baseUrl}/secuencia_aeg?interview__id=${ id }`;
    console.log(url);
    console.log(id)
   return this._http.get<SecuenciaAeg[]>(url)
    .pipe(
      tap(data => console.log(data))
    );
  }
  getODSById( id: string ): Observable<SecuenciaOds[]> {
    const url = `${ this.baseUrl}/secuencia_ods?interview__id=${ id }`;
    console.log(url);
    console.log(id)
    return this._http.get<SecuenciaOds[]>(url)
    .pipe(
      tap(data => console.log(data))
    );
  }
  getSecuenciaPSBy( id: string ): Observable<SecuenciaPS[]> {
    const url = `${ this.baseUrl}/secuencia_ps?interview__id=${ id }`;
    console.log(url);
    console.log(id)
    return this._http.get<SecuenciaPS[]>(url)
    .pipe(
      tap(data => console.log('DATA by Service',data))
    );
  }
  getSecuenciaVARBy( id: string ): Observable<SecuenciaVar[]> {
    const url = `${ this.baseUrl}/secuencia_var?interview__id=${ id }`;
    console.log(url);
    console.log(id)
    return this._http.get<SecuenciaVar[]>(url)
    .pipe(
      tap(data => console.log('DATA by Service',data))
    );
  }

  getProdInfo(){
    return this._http.get<ProgInformacion[]>(`${ this.baseUrl}/prog_informacion`)
  }
  getProcProduccion(){
    return this._http.get<ProcProduccion[]>(`${ this.baseUrl}/proc_produccion`)
  }
  getDgaPprod(){
    return this._http.get<DgaPprod[]>(`${ this.baseUrl}/dga_pprod`)
  }

  getAEG_2(){
    return this._http.get<Aeg2[]>(`${ this.baseUrl}/aeg_2`)
  }
  getAEG_prod(){
    return this._http.get<DgaProd[]>(`${ this.baseUrl}/dga_prod`)
  }


  getObjetivos(){
    return this._http.get<Ods[]>(`${ this.baseUrl}/ods`)
  }
  getMetas(){
    return this._http.get<MetaODS[]>(`${ this.baseUrl}/metaODS`)
  }

  getPS2023(){
    return this._http.get<PS2023[]>(`${ this.baseUrl}/PS_2023`)
  }
  getIndicadoresPS2023(){
    return this._http.get<IndicadoresPS2023[]>(`${ this.baseUrl}/indicadores_PS_2023`)
  }

  getEscalas(){
    return this._http.get<Escalas[]>(`${ this.baseUrl}/escalas`)
  }


}
