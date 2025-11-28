"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculosController = void 0;
const common_1 = require("@nestjs/common");
const vehiculos_service_1 = require("./vehiculos.service");
let VehiculosController = class VehiculosController {
    vehiculosService;
    constructor(vehiculosService) {
        this.vehiculosService = vehiculosService;
    }
    async registrarVehiculo(CreateVehiculodto) {
        return this.vehiculosService.RegistrarVehiculo(CreateVehiculodto);
    }
    async ObtenerVehiculos() {
        return this.vehiculosService.ObtenerVehiculos();
    }
    async ObtenerVehiculosId(placa) {
        return this.vehiculosService.ObtenerVehiculoPorId(placa);
    }
    async EliminarVehiculo(placa) {
        const vehiculo = await this.vehiculosService.ObtenerVehiculoPorId(placa);
        return {
            message: 'Vehiculo eliminado exitosamente',
            vehiculo
        };
    }
    async ActualizarVehiculo(placa, UpdateVehiculodto) {
        const vehiculo = await this.vehiculosService.ActualizarVehiculo(placa, UpdateVehiculodto);
        return {
            message: 'Vehiculo actualizado exitosamente',
            vehiculo
        };
    }
};
exports.VehiculosController = VehiculosController;
__decorate([
    (0, common_1.Post)('registrar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], VehiculosController.prototype, "registrarVehiculo", null);
__decorate([
    (0, common_1.Get)('todos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VehiculosController.prototype, "ObtenerVehiculos", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Body)('placa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiculosController.prototype, "ObtenerVehiculosId", null);
__decorate([
    (0, common_1.Delete)('eliminar'),
    __param(0, (0, common_1.Body)('placa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VehiculosController.prototype, "EliminarVehiculo", null);
__decorate([
    (0, common_1.Patch)('actualizar/:placa'),
    __param(0, (0, common_1.Param)('placa')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], VehiculosController.prototype, "ActualizarVehiculo", null);
exports.VehiculosController = VehiculosController = __decorate([
    (0, common_1.Controller)('vehiculos'),
    __metadata("design:paramtypes", [vehiculos_service_1.VehiculosService])
], VehiculosController);
//# sourceMappingURL=vehiculos.controller.js.map