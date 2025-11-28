import { RutaEntity } from "./ruta.entity";
import { VehiculosEntity } from "./vehiculos.entity";
export declare class CooperativaEntity {
    rif_cooperativa: string;
    nombre: string;
    ubicacion: string;
    descripcion: string;
    horario: string;
    rutas: RutaEntity[];
    unidad: VehiculosEntity[];
}
