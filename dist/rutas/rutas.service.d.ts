import { CreateRutasDto } from 'src/dtos/rutasdto/Create_Rutas.dto';
import { UpdateRutaDto } from 'src/dtos/rutasdto/Updatedto.dto';
import { CooperativaEntity } from 'src/entidades/cooperativa.entity';
import { RutaEntity } from 'src/entidades/ruta.entity';
import { Repository } from 'typeorm';
export declare class RutasService {
    private rutaRepository;
    private cooperativaRepository;
    constructor(rutaRepository: Repository<RutaEntity>, cooperativaRepository: Repository<CooperativaEntity>);
    crearRuta(createRutadto: CreateRutasDto): Promise<RutaEntity>;
    obtenerrutas(): Promise<RutaEntity[]>;
    obtenerRutaPorId(numero_ruta: string): Promise<RutaEntity>;
    eliminarRuta(numero_ruta: string): Promise<RutaEntity>;
    actualizarRuta(numero_ruta: string, updateRutaDto: UpdateRutaDto): Promise<RutaEntity>;
}
