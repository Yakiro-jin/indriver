import { VehiculosService } from './vehiculos.service';
export declare class VehiculosController {
    private readonly vehiculosService;
    constructor(vehiculosService: VehiculosService);
    registrarVehiculo(CreateVehiculodto: any): Promise<import("../entidades/vehiculos.entity").VehiculosEntity>;
    ObtenerVehiculos(): Promise<import("../entidades/vehiculos.entity").VehiculosEntity[]>;
    ObtenerVehiculosId(placa: string): Promise<import("../entidades/vehiculos.entity").VehiculosEntity>;
    EliminarVehiculo(placa: string): Promise<{
        message: string;
        vehiculo: import("../entidades/vehiculos.entity").VehiculosEntity;
    }>;
    ActualizarVehiculo(placa: string, UpdateVehiculodto: any): Promise<{
        message: string;
        vehiculo: import("../entidades/vehiculos.entity").VehiculosEntity;
    }>;
}
