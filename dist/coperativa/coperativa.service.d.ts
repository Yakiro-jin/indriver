import { CreateCooperativaDto } from 'src/dtos/Create_cooperativa.dto';
import { UpdateCooperativaDto } from 'src/dtos/Updatecooperativa.dto';
import { CooperativaEntity } from 'src/entidades/cooperativa.entity';
import { Repository } from 'typeorm';
export declare class CooperativaService {
    private cooperativaRepository;
    constructor(cooperativaRepository: Repository<CooperativaEntity>);
    CrearCooperativa(CreateCooperativadto: CreateCooperativaDto): Promise<CooperativaEntity>;
    ObtenerCooperativas(): Promise<CooperativaEntity[]>;
    ObtenercooperativaPorRif(Rif_cooperativa: string): Promise<CooperativaEntity>;
    EliminarCooperativa(rif_cooperativa: string): Promise<CooperativaEntity>;
    ActualizarCooperativa(rif_cooperativa: string, UpdateCooperativadto: UpdateCooperativaDto): Promise<CooperativaEntity>;
}
