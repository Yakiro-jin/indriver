import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VehiculosService } from './vehiculos.service';

@Controller('vehiculos')
export class VehiculosController {
  constructor(private readonly vehiculosService: VehiculosService) {}

  @Post('registrar')
  async registrarVehiculo(@Body() CreateVehiculodto) {
    return this.vehiculosService.RegistrarVehiculo(CreateVehiculodto);
  }


  @Get('todos')
  async ObtenerVehiculos() {
    return this.vehiculosService.ObtenerVehiculos();
  }


  @Get('filter')
  async ObtenerVehiculosId(@Body('placa') placa :string){
    return this.vehiculosService.ObtenerVehiculoPorId(placa);
  }

  @Delete('eliminar')
  async EliminarVehiculo(@Body('placa') placa:string){
    const vehiculo = await this.vehiculosService.ObtenerVehiculoPorId(placa);
    return {
      message: 'Vehiculo eliminado exitosamente',
      vehiculo
    };
  }


  @Patch('actualizar/:placa')
  async ActualizarVehiculo(@Param('placa') placa : string, @Body() UpdateVehiculodto:any){
    const vehiculo = await this.vehiculosService.ActualizarVehiculo(placa,UpdateVehiculodto);
    // Lógica para actualizar el vehículo utilizando UpdateVehiculodto
    return {
      message: 'Vehiculo actualizado exitosamente',
      vehiculo
    };
  }
  

}
