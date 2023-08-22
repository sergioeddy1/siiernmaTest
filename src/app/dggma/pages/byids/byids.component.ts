import { Component, OnInit } from '@angular/core';
import { Escalas, Products, SecuenciaVar } from '../../interfaces/product.interface';
import { DGService } from '../../services/dg.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { DgaPprod, Pi, ProcProduccion, ProgInformacion } from '../../interfaces/pi.interface';
import { UAdmin } from '../../interfaces/u_admin.interface';
import { Componente, Mdea, Subcomponente, Topico } from '../../interfaces/mdea.interface';
import { Aeg2, DgaProd, SecuenciaAeg } from '../../interfaces/aeg.interface';
import { MetaODS, Ods, SecuenciaOds } from '../../interfaces/ods.interface';
import { IndicadoresPS2023, PS2023, SecuenciaPS } from '../../interfaces/ps.interface';

@Component({
  selector: 'app-byids',
  templateUrl: './byids.component.html',
  styleUrls: ['./byids.component.css']
})
export class ByidsComponent implements OnInit{
  public mdeas?: Mdea[]=[];
  public pi?: Pi[]=[];
  public dgs: UAdmin[] = [];
  public proInfo: ProgInformacion[] = [];
  public procPro: ProcProduccion[] = [];
  public dga_Pprod: DgaPprod[] = [];
  public componentesMDEA: Componente[]=[];
  public subComponentesMDEA: Subcomponente[]=[];
  public topicoMDEA: Topico[]=[];
  public aegSecuencia: SecuenciaAeg[]=[];
  public aeg_2: Aeg2[]=[];
  public aeg_Prod: DgaProd[]=[];
  public ODSes?: SecuenciaOds[]=[];
  public objetivODS: Ods[]=[];
  public metasODS: MetaODS[]=[];

  public PSes?: SecuenciaPS[]=[];
  public ps2023: PS2023[]=[];
  public indicadoresPS2023: IndicadoresPS2023[]=[];
  public secuenciaVAR: SecuenciaVar[]=[]
  public escalas: Escalas[]=[];
  public productsById: Products[] = [];
  expandedIndex: number | null = null;

  constructor(
    private _direServices: DGService,
    private _router: Router,
    private _leeLink: ActivatedRoute
  ){}

  ngOnInit(): void {

    this._direServices.getDG()
    .subscribe( dgs => this.dgs = dgs );

    this._direServices.getProdInfo()
    .subscribe( pInfo => this.proInfo = pInfo);

    this._direServices.getProcProduccion()
    .subscribe( procProduccion => this.procPro = procProduccion );

    this._direServices.getDgaPprod()
    .subscribe( dga_pprod => this.dga_Pprod = dga_pprod);

    this._direServices.getComponentes()
    .subscribe( componentes => this.componentesMDEA = componentes)

    this._direServices.getSubcomponentes()
    .subscribe( subcomponente => this.subComponentesMDEA = subcomponente)

    this._direServices.getTopicos()
    .subscribe( topicomdea => this.topicoMDEA = topicomdea)

    this._direServices.getAEG_2()
    .subscribe( aeg_2 => this.aeg_2 = aeg_2)

    this._direServices.getAEG_prod()
    .subscribe( aeg_prod => this.aeg_Prod = aeg_prod )

    this._direServices.getObjetivos()
    .subscribe( objetivos => this.objetivODS = objetivos)

    this._direServices.getMetas()
    .subscribe( metas => this.metasODS = metas )

    this._direServices.getPS2023()
    .subscribe(ps2023 => this.ps2023 = ps2023)

    this._direServices.getIndicadoresPS2023()
    .subscribe( indiPS2023 => this.indicadoresPS2023 = indiPS2023)




    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getPIById(id))
    )
    .subscribe(data => {
      this.pi = data;
    });

    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getAEGById(id))
    )
    .subscribe(data => {
      this.aegSecuencia = data;
    });

    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getMDEASById(id))
    )
    .subscribe(data => {
      this.mdeas = data;
    });

    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getODSById(id))
    )
    .subscribe( data => {
      this.ODSes = data;
    });

    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getSecuenciaPSBy(id))
    )
    .subscribe( data => {
      this.PSes = data;
    });

    this._leeLink.params
    .pipe(
      switchMap(({ id }) => this._direServices.getSecuenciaVARBy(id))
    )
    .subscribe( data => {
      this.secuenciaVAR = data;
    })

    this._leeLink.params
    .pipe(

      switchMap(({ id }) =>{

        // if (by==1) {
        //   by=2
        // } else if(by==2) {
        //   by=3
        // } else if ( by==3){
        //   by=1
        // } else if ( by==4){
        //   by=5
        // } else if ( by ==5){
        //   by=4
        // }

        return this._direServices.getProductById(id)
      } )
    )
    .subscribe( data => {
      this.productsById = data;
    })


this.console();

  }

  console(){
    console.log(this.pi)
    console.log(this._leeLink.params)
    console.log(this.productsById)
    console.log(this.PSes)
  }


  getDireccionGeneralText(dg_pi: number): string {
  let direccionGeneralText = '';
  for (let direccion_general of this.dgs) {
    if (direccion_general.id === dg_pi) {
      direccionGeneralText = direccion_general.text;
      break;
    }
  }
  return direccionGeneralText;
}

getProgInfoText(nom_pi: number): string {
  let progInfoText = '';
  for (let progInfo of this.proInfo) {
    if (progInfo.id === nom_pi) {
      progInfoText = progInfo.text;
      break;
    }
  }
  return progInfoText;
}

getProcProduccionText(pp_pi: number): string {
  let procProduccionText = '';
  for (let procProduccion of this.procPro) {
    if (procProduccion.id === pp_pi) {
      procProduccionText = procProduccion.text;
      break;
    }
  }
  return procProduccionText;
}

getDga_PprodText(dga_pi: number): string {
  let dga_PprodText = '';
  for (let dga_Pprod of this.dga_Pprod) {
    if (dga_Pprod.id === dga_pi) {
      dga_PprodText = dga_Pprod.text;
      break;
    }
  }
  return dga_PprodText;
}

getComponenteText(comp_mdea: number): string {
  let componentesMDEAText = '';
  for (let componentesMDEA of this.componentesMDEA) {
    if (componentesMDEA.id === comp_mdea) {
      componentesMDEAText = componentesMDEA.text;
      break;
    }
  }
  return componentesMDEAText;
}
getSubcomponenteText(subcomp_mdea: number): string {
  let subComponentesMDEAText = '';
  for (let subComponentesMDEA of this.subComponentesMDEA) {
    if (subComponentesMDEA.id === subcomp_mdea) {
      subComponentesMDEAText = subComponentesMDEA.text;
      break;
    }
  }
  return subComponentesMDEAText;
}
getTopicoText(topico_mdea: number): string {
  let topicoMDEAText = '';
  for (let topicoMDEA of this.topicoMDEA) {
    if (topicoMDEA.id === topico_mdea) {
      topicoMDEAText = topicoMDEA.text;
      break;
    }
  }
  return topicoMDEAText;
}
getAEG_2Text(nom_aeg: number): string {
  let aeg_2Text = '';
  for (let aeg_2 of this.aeg_2) {
    if (aeg_2.id === nom_aeg) {
      aeg_2Text = aeg_2.text;
      break;
    }
  }
  return aeg_2Text;
}
getAEG_ProdText(dga_eag: number): string {
  let aeg_ProdText = '';
  for (let aeg_Prod of this.aeg_Prod) {
    if (aeg_Prod.id === dga_eag) {
      aeg_ProdText = aeg_Prod.text;
      break;
    }
  }
  return aeg_ProdText;
}

getObjetivODSText(obj_ods: number): string {
  let objetivODSText = '';
  for (let objetivODS of this.objetivODS) {
    if (objetivODS.id === obj_ods) {
      objetivODSText = objetivODS.text;
      break;
    }
  }
  return objetivODSText;
}
getMetaODSText(meta_ods: number): string {
  let metasODSText = '';
  for (let metasODS of this.metasODS) {
    if (metasODS.id === meta_ods) {
      metasODSText = metasODS.text;
      break;
    }
  }
  return metasODSText;
}


getps2023Text(prog_ps: number): string {
  let ps2023Text = '';
  for (let ps2023 of this.ps2023) {
    if (ps2023.id === prog_ps) {
      ps2023Text = ps2023.text;
      break;
    }
  }
  return ps2023Text;
}
getIndicadoresPS2023Text(indicador_ps: number): string {
  let indicadoresPS2023Text = '';
  for (let indicadoresPS2023 of this.indicadoresPS2023) {
    if (indicadoresPS2023.id === indicador_ps) {
      indicadoresPS2023Text = indicadoresPS2023.text;
      break;
    }
  }
  return indicadoresPS2023Text;
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


}
