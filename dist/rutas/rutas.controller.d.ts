import { RutasService } from './rutas.service';
export declare class RutasController {
    private readonly rutasService;
    constructor(rutasService: RutasService);
    crearRuta(createRutadto: any): Promise<import("../entidades/ruta.entity").RutaEntity>;
    obtenerRutas(): Promise<import("../entidades/ruta.entity").RutaEntity[]>;
    obtenerRutaPorId(numero_ruta: string): Promise<import("../entidades/ruta.entity").RutaEntity>;
    eliminarRuta(numero_ruta: string): Promise<import("../entidades/ruta.entity").RutaEntity>;
    actualizarRuta(numero_ruta: string, UpdateRutaDto: any): Promise<import("../entidades/ruta.entity").RutaEntity>;
}
