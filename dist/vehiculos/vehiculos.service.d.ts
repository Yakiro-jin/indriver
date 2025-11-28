import { CreateVehiculosDto } from 'src/dtos/vehiculosdto/Create_Vehiculos.dto';
import { UpdateVehiculoDto } from 'src/dtos/vehiculosdto/UpdateVehiculodto.dto';
import { CooperativaEntity } from 'src/entidades/cooperativa.entity';
import { VehiculosEntity } from 'src/entidades/vehiculos.entity';
import { Repository } from 'typeorm';
export declare class VehiculosService {
    private vehiculoRepository;
    private CooperativaRepository;
    constructor(vehiculoRepository: Repository<VehiculosEntity>, CooperativaRepository: Repository<CooperativaEntity>);
    ObtenerVehiculos(): Promise<VehiculosEntity[]>;
    ObtenerVehiculoPorId(placa: string): Promise<VehiculosEntity>;
    verificarVehiculo(placa: string): Promise<boolean>;
    verificarCooperativa(rif_cooperativa: string): Promise<CooperativaEntity>;
    RegistrarVehiculo(CreateVehiculodto: CreateVehiculosDto): Promise<VehiculosEntity>;
    EliminarVehiculo(placa: string): Promise<VehiculosEntity>;
    ActualizarVehiculo(placa: string, updateVehiculodto: UpdateVehiculoDto): Promise<VehiculosEntity>;
}
