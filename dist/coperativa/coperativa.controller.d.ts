import { CooperativaService } from './coperativa.service';
export declare class CoperativaController {
    private readonly cooperativaService;
    constructor(cooperativaService: CooperativaService);
    crearCooperativa(createcooperativadto: any): Promise<import("../entidades/cooperativa.entity").CooperativaEntity>;
    obtenerCooperativas(): Promise<import("../entidades/cooperativa.entity").CooperativaEntity[]>;
    obtenerCooperativaPorRif(rif_cooperativa: string): Promise<import("../entidades/cooperativa.entity").CooperativaEntity>;
    EliminarCooperativa(rif_cooperativa: string): Promise<import("../entidades/cooperativa.entity").CooperativaEntity>;
    ActualizarCooperativa(rif_cooperativa: string, updateCooperativadto: any): Promise<import("../entidades/cooperativa.entity").CooperativaEntity>;
}
