export interface Products {
    interview__key:    string;
    interview__id:     string;
    nom_producto:      string;
    nom_prod:          string;
    dg_prod:           number | string;
    tipo_prod__1:      number | string;
    tipo_prod__2:      number | string;
    escala:            number;
    o_escala:          OEscala;
    fragmenta:         number | string;
    n_fragmenta:       number | string;
    tipo_soporte__1:   number | string;
    tipo_soporte__2:   number | string;
    tipo_soporte__3:   number | string;
    tipo_soporte__4:   number | string;
    o_soporte:         OSoporte;
    formato_geo__1:    number | string;
    formato_geo__2:    number | string;
    formato_geo__3:    number | string;
    formato_geo__4:    number | string;
    formato_geo__5:    number | string;
    o_formato_geo:     OFormatoGeo;
    formato_tab__1:    number | string;
    formato_tab__2:    number | string;
    formato_tab__3:    number | string;
    formato_tab__4:    number | string;
    formato_tab__5:    number | string;
    o_formato_tab:     OFormatoTab;
    cobertura_geo__1:  number | string;
    cobertura_geo__2:  number | string;
    cobertura_geo__3:  number | string;
    cobertura_geo__4:  number | string;
    cobertura_geo__5:  number | string;
    o_cobertura:       string;
    a_referencia:      number | string;
    a_publicacion:     number | string;
    actualizacion:     number | string;
    p_actualizacion:   number | string;
    o_periodo:         string;
    liga:              string;
    metodologia:       number | string;
    liga_metodologia:  string;
    comentario_cg:     number | string;
    num_var:           number | string;
    pi:                number | string;
    num_pi:            number | string;
    comentario_pi:     string;
    act_aeg:           number | string;
    num_aeg:           number | string;
    comentario_aeg:    string;
    capturista_1:      number | string;
    relacion_mdea:     number | string;
    num_mdea:          number | string;
    comentario_mdea:   string;
    relacion_ods:      number | string;
    num_ods:           number | string;
    comentario_ods:    string;
    capturista_2:      number | string;
    relacion_ps:       number | string;
    num_ps:            number | string;
    comentario_ps:     string;
    capturista_3:      number | string;
    sssys_irnd:        number;
    has__errors:       number;
    interview__status: number;
    assignment__id:    number;
    a_publicacion2?:   number;
    a_referencia2?:    number;
}

export enum OEscala {
    Empty = "",
    OEscala10000 = "1:0000",
    Purple10000 = "1: 0 000",
    The10000 = "1: 0000",
    The120000000 = "1:20 000 000",
}

export enum OFormatoGeo {
    Empty = "",
    Zip = "ZIP",
}

export enum OFormatoTab {
    Empty = "",
    PDF = "PDF",
}

export enum OSoporte {
    Empty = "",
    Oficio = "Oficio",
}
export interface Escalas {
    id:             number;
    text:           string;
    parentid:       string;
    attachmentname: string;
}
export interface SecuenciaVar {
    interview__key:    string;
    interview__id:     string;
    secuencia_var__id: number;
    nom_var:           string;
}
