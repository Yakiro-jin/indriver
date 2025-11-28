import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRutasDto } from 'src/dtos/rutasdto/Create_Rutas.dto';
import { UpdateRutaDto } from 'src/dtos/rutasdto/Updatedto.dto';
import { CooperativaEntity } from 'src/entidades/cooperativa.entity';
import { RutaEntity } from 'src/entidades/ruta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RutasService {
constructor(@InjectRepository(RutaEntity) private rutaRepository : Repository<RutaEntity>,
@InjectRepository(CooperativaEntity) private cooperativaRepository : Repository<CooperativaEntity>) { }


async crearRuta(createRutadto:CreateRutasDto) : Promise<RutaEntity> {

    const cooperativa = await this.cooperativaRepository.findOne({
        where: { rif_cooperativa: createRutadto.cooperativa_id }
    });

    if(!cooperativa) {
        throw new NotFoundException(`Usuario con ID ${createRutadto.cooperativa_id} no encontrado.`);
    }
    const nuevaRuta = new RutaEntity();
    nuevaRuta.numero_ruta = createRutadto.numero_ruta;
    nuevaRuta.nombre = createRutadto.nombre;
    nuevaRuta.descripcion = createRutadto.descripcion;
    nuevaRuta.tarifa = createRutadto.tarifa;
    nuevaRuta.origen_id = createRutadto.origen_id;
    nuevaRuta.destino_id = createRutadto.destino_id;
    nuevaRuta.cooperativa = cooperativa;
    return this.rutaRepository.save(nuevaRuta);
    
}


async obtenerrutas(): Promise<RutaEntity[]> {
    return this.rutaRepository.find({ relations: ['cooperativa'] });
}


 async obtenerRutaPorId(numero_ruta: string): Promise<RutaEntity> {
    const ruta = await this.rutaRepository.findOne({where:{numero_ruta}, relations: ['cooperativa'] });
    if(!ruta){
        throw new NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
    }
    return ruta;
 }


 async eliminarRuta(numero_ruta: string): Promise<RutaEntity> {
    const ruta = await this.rutaRepository.findOne({where:{numero_ruta}});
    if(!ruta){
        throw new NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
    }
    return await this.rutaRepository.remove(ruta);
 }

 async actualizarRuta(numero_ruta: string, updateRutaDto: UpdateRutaDto): Promise<RutaEntity> {
    const ruta = await this.rutaRepository.findOne({where:{numero_ruta}});
    
    if(!ruta){
        throw new NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
    }
        if(updateRutaDto.cooperativa_id) {
            const cooperativa = await this.cooperativaRepository.findOne({where : {rif_cooperativa: updateRutaDto.cooperativa_id}});  
            if(!cooperativa) {
            throw new NotFoundException(`Cooperativa con ID ${updateRutaDto.cooperativa_id} no encontrada.`);
        } 
        ruta.cooperativa = cooperativa; 
    }
    ruta.numero_ruta = updateRutaDto.numero_ruta ?? ruta.numero_ruta;
    ruta.nombre = updateRutaDto.nombre ?? ruta.nombre;
    ruta.descripcion = updateRutaDto.descripcion ?? ruta.descripcion;
    ruta.tarifa = updateRutaDto.tarifa ?? ruta.tarifa;
    ruta.origen_id = updateRutaDto.origen_id ?? ruta.origen_id;
    ruta.destino_id = updateRutaDto.destino_id ?? ruta.destino_id;
    return await this.rutaRepository.save(ruta);
 }

}
