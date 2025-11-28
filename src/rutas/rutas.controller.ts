import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { create } from 'domain';
import { CreateRutasDto } from 'src/dtos/rutasdto/Create_Rutas.dto';
import { UpdateRutaDto } from 'src/dtos/rutasdto/Updatedto.dto';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}



 @Post('crear')
 async crearRuta(@Body() createRutadto) {
    return this.rutasService.crearRuta(createRutadto);
  }

 @Get('obtener')
 async obtenerRutas() {
    return this.rutasService.obtenerrutas();
  }

  @Post('filter')
  async obtenerRutaPorId(@Body('numero_ruta') numero_ruta: string) {
    return this.rutasService.obtenerRutaPorId(numero_ruta);
  }

  @Post('eliminar')
  async eliminarRuta(@Body('numero_ruta') numero_ruta: string) {
    return this.rutasService.eliminarRuta(numero_ruta);
  }

  @Patch('actualizar')
  async actualizarRuta(@Body('numero_ruta') numero_ruta: string, @Body() UpdateRutaDto:any) {
    return this.rutasService.actualizarRuta(numero_ruta, UpdateRutaDto);
  }

}
