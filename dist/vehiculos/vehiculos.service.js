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
exports.VehiculosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cooperativa_entity_1 = require("../entidades/cooperativa.entity");
const vehiculos_entity_1 = require("../entidades/vehiculos.entity");
const typeorm_2 = require("typeorm");
let VehiculosService = class VehiculosService {
    vehiculoRepository;
    CooperativaRepository;
    constructor(vehiculoRepository, CooperativaRepository) {
        this.vehiculoRepository = vehiculoRepository;
        this.CooperativaRepository = CooperativaRepository;
    }
    async ObtenerVehiculos() {
        return this.vehiculoRepository.find({ relations: ['cooperativa'] });
    }
    async ObtenerVehiculoPorId(placa) {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { placa }, relations: ['cooperativa'] });
        if (!vehiculo) {
            throw new common_1.NotFoundException(`Vehiculo ${placa} no encontrada.`);
        }
        return vehiculo;
    }
    async verificarVehiculo(placa) {
        const vehiculo = await this.vehiculoRepository.findOne({ where: { placa } });
        return !!vehiculo;
    }
    async verificarCooperativa(rif_cooperativa) {
        const cooperativa = await this.CooperativaRepository.findOne({ where: { rif_cooperativa } });
        if (!cooperativa) {
            throw new common_1.NotFoundException(`Cooperativa con rif ${rif_cooperativa} no encontrada.`);
        }
        return cooperativa;
    }
    async RegistrarVehiculo(CreateVehiculodto) {
        const placa = await this.verificarVehiculo(CreateVehiculodto.placa);
        const cooperativa = await this.verificarCooperativa(CreateVehiculodto.cooperativa_id);
        if (placa) {
            throw new common_1.NotFoundException(`Vehiculo con placa ${CreateVehiculodto.placa} ya registrado.`);
        }
        const nuevoVehiculo = new vehiculos_entity_1.VehiculosEntity();
        nuevoVehiculo.placa = CreateVehiculodto.placa;
        nuevoVehiculo.modelo = CreateVehiculodto.modelo;
        nuevoVehiculo.color = CreateVehiculodto.color;
        nuevoVehiculo.anofabricacion = CreateVehiculodto.anofabricacion;
        nuevoVehiculo.cooperativa = cooperativa;
        return this.vehiculoRepository.save(nuevoVehiculo);
    }
    async EliminarVehiculo(placa) {
        const vehiculo = await this.ObtenerVehiculoPorId(placa);
        return this.vehiculoRepository.remove(vehiculo);
    }
    async ActualizarVehiculo(placa, updateVehiculodto) {
        if (updateVehiculodto.placa && updateVehiculodto.placa !== placa) {
            const placaExiste = await this.verificarVehiculo(updateVehiculodto.placa);
            if (placaExiste) {
                throw new common_1.NotFoundException(`Vehiculo con placa ${updateVehiculodto.placa} ya registrado.`);
            }
            await this.vehiculoRepository.update(placa, { placa: updateVehiculodto.placa });
            placa = updateVehiculodto.placa;
        }
        const vehiculo = await this.ObtenerVehiculoPorId(placa);
        if (updateVehiculodto.cooperativa_id) {
            const cooperativa = await this.verificarCooperativa(updateVehiculodto.cooperativa_id);
            vehiculo.cooperativa = cooperativa;
            delete updateVehiculodto.cooperativa_id;
        }
        vehiculo.modelo = updateVehiculodto.modelo ?? vehiculo.modelo;
        vehiculo.color = updateVehiculodto.color ?? vehiculo.color;
        vehiculo.anofabricacion = updateVehiculodto.anofabricacion ?? vehiculo.anofabricacion;
        return this.vehiculoRepository.save(vehiculo);
    }
};
exports.VehiculosService = VehiculosService;
exports.VehiculosService = VehiculosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehiculos_entity_1.VehiculosEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(cooperativa_entity_1.CooperativaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VehiculosService);
//# sourceMappingURL=vehiculos.service.js.map