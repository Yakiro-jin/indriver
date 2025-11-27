import { CooperativaEntity } from "./cooperativa.entity";
export declare class RutaEntity {
    numero_ruta: string;
    nombre: string;
    descripcion: string;
    tarifa: number;
    origen_id: number;
    destino_id: number;
    cooperativa: CooperativaEntity;
}
