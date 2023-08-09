export interface Mdea {
    interview__key:     string;
    interview__id:      string;
    secuencia_mdea__id: number;
    comp_mdea:          number;
    subcomp_mdea:       number;
    topico_mdea:        number;
    obs_mdea:           string;
}
export interface Componente {
    id:             number;
    text:           string;
    parentid:       string;
    attachmentname: string;
}
export interface Subcomponente {
    id:             number;
    text:           string;
    parentid:       number;
    attachmentname: string;
}
export interface Topico {
    id:             number;
    text:           string;
    parentid:       number;
    attachmentname: string;
}
