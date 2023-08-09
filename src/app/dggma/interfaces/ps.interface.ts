export interface SecuenciaPS {
    interview__key:   string;
    interview__id:    string;
    secuencia_ps__id: number;
    prog_ps:          number;
    indicador_ps:     number ;
    obs_ps:           string;
}
export interface PS2023 {
    id:             number;
    text:           string;
    parentid:       string;
    attachmentname: string;
}
export interface IndicadoresPS2023 {
    id:             number;
    text:           string;
    parentid:       number;
    attachmentname: string;
}
