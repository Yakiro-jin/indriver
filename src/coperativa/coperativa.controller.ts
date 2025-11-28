import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { CooperativaService } from './coperativa.service';
import { CreateCooperativaDto } from 'src/dtos/cooperativadto/Create_cooperativa.dto';
import { UpdateCooperativaDto } from 'src/dtos/cooperativadto/Updatecooperativa.dto';

@Controller('cooperativa')
export class CoperativaController {
  constructor(private readonly cooperativaService: CooperativaService) {}


  @Post('crear')
  async crearCooperativa(@Body() createcooperativadto) {
    return this.cooperativaService.CrearCooperativa(createcooperativadto);
  }

  @Get('todas')
  async obtenerCooperativas() {
    return this.cooperativaService.ObtenerCooperativas();
  }

  @Post('filter')
  async obtenerCooperativaPorRif(@Body('rif_cooperativa') rif_cooperativa: string) {
    return this.cooperativaService.ObtenercooperativaPorRif(rif_cooperativa);
  }


  @Delete('eliminar')
  async EliminarCooperativa(@Body('rif_cooperativa') rif_cooperativa :string){
    return this.cooperativaService.EliminarCooperativa(rif_cooperativa);
  }


  @Patch('actualizar')
  async ActualizarCooperativa(@Body('rif_cooperativa') rif_cooperativa : string ,@Body() updateCooperativadto: any){
    return this.cooperativaService.ActualizarCooperativa(rif_cooperativa,updateCooperativadto);
  }
    
}
