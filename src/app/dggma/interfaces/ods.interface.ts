export interface SecuenciaOds {
    interview__key:    string;
    interview__id:     string;
    secuencia_ods__id: number;
    obj_ods:           number;
    meta_ods:          number;
    obs_ods:           string;
}
export interface Ods {
    id:             number;
    text:           string;
    parentid:       string;
    attachmentname: string;
}
export interface MetaODS {
    id:             number;
    text:           string;
    parentid:       number;
    attachmentname: string;
}
