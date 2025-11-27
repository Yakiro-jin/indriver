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
exports.CooperativaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cooperativa_entity_1 = require("../entidades/cooperativa.entity");
const typeorm_2 = require("typeorm");
let CooperativaService = class CooperativaService {
    cooperativaRepository;
    constructor(cooperativaRepository) {
        this.cooperativaRepository = cooperativaRepository;
    }
    async CrearCooperativa(CreateCooperativadto) {
        const nuevacooperativa = await this.cooperativaRepository.findOne({ where: { rif_cooperativa: CreateCooperativadto.rif_cooperativa } });
        if (nuevacooperativa) {
            throw new common_1.NotFoundException(`Esta coopertiva ya se encuentra registrada ${CreateCooperativadto.rif_cooperativa} no encontrado.`);
        }
        const cooperativa = new cooperativa_entity_1.CooperativaEntity();
        cooperativa.rif_cooperativa = CreateCooperativadto.rif_cooperativa;
        cooperativa.nombre = CreateCooperativadto.nombre;
        cooperativa.ubicacion = CreateCooperativadto.ubicacion;
        cooperativa.descripcion = CreateCooperativadto.descripcion;
        cooperativa.horario = CreateCooperativadto.horario;
        return this.cooperativaRepository.save(cooperativa);
    }
    async ObtenerCooperativas() {
        return this.cooperativaRepository.find();
    }
    async ObtenercooperativaPorRif(Rif_cooperativa) {
        const cooperativa = await this.cooperativaRepository.findOne({ where: { rif_cooperativa: Rif_cooperativa } });
        if (!cooperativa) {
            throw new common_1.NotFoundException(`Esta coopertiva no se encuentra registrada ${Rif_cooperativa} no encontrado.`);
        }
        return cooperativa;
    }
    async EliminarCooperativa(rif_cooperativa) {
        const cooperativa = await this.cooperativaRepository.findOne({ where: { rif_cooperativa: rif_cooperativa } });
        if (!cooperativa) {
            throw new common_1.NotFoundException(`Esta coopertiva no se encuentra registrada ${rif_cooperativa} no encontrado.`);
        }
        return await this.cooperativaRepository.remove(cooperativa);
    }
    async ActualizarCooperativa(rif_cooperativa, UpdateCooperativadto) {
        const cooperativa = await this.cooperativaRepository.findOne({ where: { rif_cooperativa: UpdateCooperativadto.rif_cooperativa } });
        if (!cooperativa) {
            throw new common_1.NotFoundException(`Esta coopertiva no se encuentra registrada ${UpdateCooperativadto.rif_cooperativa} no encontrado.`);
        }
        const upadte = cooperativa;
        upadte.rif_cooperativa = UpdateCooperativadto.rif_cooperativa ?? cooperativa.rif_cooperativa;
        upadte.nombre = UpdateCooperativadto.nombre ?? cooperativa.nombre;
        upadte.ubicacion = UpdateCooperativadto.ubicacion ?? cooperativa.ubicacion;
        upadte.descripcion = UpdateCooperativadto.descripcion ?? cooperativa.descripcion;
        upadte.horario = UpdateCooperativadto.horario ?? cooperativa.horario;
        return this.cooperativaRepository.save(cooperativa);
    }
};
exports.CooperativaService = CooperativaService;
exports.CooperativaService = CooperativaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cooperativa_entity_1.CooperativaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CooperativaService);
//# sourceMappingURL=coperativa.service.js.map