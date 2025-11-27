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
exports.CoperativaController = void 0;
const common_1 = require("@nestjs/common");
const coperativa_service_1 = require("./coperativa.service");
let CoperativaController = class CoperativaController {
    cooperativaService;
    constructor(cooperativaService) {
        this.cooperativaService = cooperativaService;
    }
    async crearCooperativa(createcooperativadto) {
        return this.cooperativaService.CrearCooperativa(createcooperativadto);
    }
    async obtenerCooperativas() {
        return this.cooperativaService.ObtenerCooperativas();
    }
    async obtenerCooperativaPorRif(rif_cooperativa) {
        return this.cooperativaService.ObtenercooperativaPorRif(rif_cooperativa);
    }
    async EliminarCooperativa(rif_cooperativa) {
        return this.cooperativaService.EliminarCooperativa(rif_cooperativa);
    }
    async ActualizarCooperativa(rif_cooperativa, updateCooperativadto) {
        return this.cooperativaService.ActualizarCooperativa(rif_cooperativa, updateCooperativadto);
    }
};
exports.CoperativaController = CoperativaController;
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoperativaController.prototype, "crearCooperativa", null);
__decorate([
    (0, common_1.Get)('todas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoperativaController.prototype, "obtenerCooperativas", null);
__decorate([
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)('rif_cooperativa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoperativaController.prototype, "obtenerCooperativaPorRif", null);
__decorate([
    (0, common_1.Delete)('eliminar'),
    __param(0, (0, common_1.Body)('rif_cooperativa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoperativaController.prototype, "EliminarCooperativa", null);
__decorate([
    (0, common_1.Patch)('actualizar'),
    __param(0, (0, common_1.Body)('rif_cooperativa')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CoperativaController.prototype, "ActualizarCooperativa", null);
exports.CoperativaController = CoperativaController = __decorate([
    (0, common_1.Controller)('cooperativa'),
    __metadata("design:paramtypes", [coperativa_service_1.CooperativaService])
], CoperativaController);
//# sourceMappingURL=coperativa.controller.js.map