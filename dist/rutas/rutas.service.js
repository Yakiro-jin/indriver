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
exports.RutasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cooperativa_entity_1 = require("../entidades/cooperativa.entity");
const ruta_entity_1 = require("../entidades/ruta.entity");
const typeorm_2 = require("typeorm");
let RutasService = class RutasService {
    rutaRepository;
    cooperativaRepository;
    constructor(rutaRepository, cooperativaRepository) {
        this.rutaRepository = rutaRepository;
        this.cooperativaRepository = cooperativaRepository;
    }
    async crearRuta(createRutadto) {
        const cooperativa = await this.cooperativaRepository.findOne({
            where: { rif_cooperativa: createRutadto.cooperativa_id }
        });
        if (!cooperativa) {
            throw new common_1.NotFoundException(`Usuario con ID ${createRutadto.cooperativa_id} no encontrado.`);
        }
        const nuevaRuta = new ruta_entity_1.RutaEntity();
        nuevaRuta.numero_ruta = createRutadto.numero_ruta;
        nuevaRuta.nombre = createRutadto.nombre;
        nuevaRuta.descripcion = createRutadto.descripcion;
        nuevaRuta.tarifa = createRutadto.tarifa;
        nuevaRuta.origen_id = createRutadto.origen_id;
        nuevaRuta.destino_id = createRutadto.destino_id;
        nuevaRuta.cooperativa = cooperativa;
        return this.rutaRepository.save(nuevaRuta);
    }
    async obtenerrutas() {
        return this.rutaRepository.find({ relations: ['cooperativa'] });
    }
    async obtenerRutaPorId(numero_ruta) {
        const ruta = await this.rutaRepository.findOne({ where: { numero_ruta }, relations: ['cooperativa'] });
        if (!ruta) {
            throw new common_1.NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
        }
        return ruta;
    }
    async eliminarRuta(numero_ruta) {
        const ruta = await this.rutaRepository.findOne({ where: { numero_ruta } });
        if (!ruta) {
            throw new common_1.NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
        }
        return await this.rutaRepository.remove(ruta);
    }
    async actualizarRuta(numero_ruta, updateRutaDto) {
        const ruta = await this.rutaRepository.findOne({ where: { numero_ruta } });
        if (!ruta) {
            throw new common_1.NotFoundException(`Ruta con numero ${numero_ruta} no encontrada.`);
        }
        if (updateRutaDto.cooperativa_id) {
            const cooperativa = await this.cooperativaRepository.findOne({ where: { rif_cooperativa: updateRutaDto.cooperativa_id } });
            if (!cooperativa) {
                throw new common_1.NotFoundException(`Cooperativa con ID ${updateRutaDto.cooperativa_id} no encontrada.`);
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
};
exports.RutasService = RutasService;
exports.RutasService = RutasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ruta_entity_1.RutaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(cooperativa_entity_1.CooperativaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RutasService);
//# sourceMappingURL=rutas.service.js.map