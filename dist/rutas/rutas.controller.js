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
exports.RutasController = void 0;
const common_1 = require("@nestjs/common");
const rutas_service_1 = require("./rutas.service");
let RutasController = class RutasController {
    rutasService;
    constructor(rutasService) {
        this.rutasService = rutasService;
    }
    async crearRuta(createRutadto) {
        return this.rutasService.crearRuta(createRutadto);
    }
    async obtenerRutas() {
        return this.rutasService.obtenerrutas();
    }
    async obtenerRutaPorId(numero_ruta) {
        return this.rutasService.obtenerRutaPorId(numero_ruta);
    }
    async eliminarRuta(numero_ruta) {
        return this.rutasService.eliminarRuta(numero_ruta);
    }
    async actualizarRuta(numero_ruta, UpdateRutaDto) {
        return this.rutasService.actualizarRuta(numero_ruta, UpdateRutaDto);
    }
};
exports.RutasController = RutasController;
__decorate([
    (0, common_1.Post)('crear'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "crearRuta", null);
__decorate([
    (0, common_1.Get)('obtener'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "obtenerRutas", null);
__decorate([
    (0, common_1.Post)('filter'),
    __param(0, (0, common_1.Body)('numero_ruta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "obtenerRutaPorId", null);
__decorate([
    (0, common_1.Post)('eliminar'),
    __param(0, (0, common_1.Body)('numero_ruta')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "eliminarRuta", null);
__decorate([
    (0, common_1.Patch)('actualizar'),
    __param(0, (0, common_1.Body)('numero_ruta')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RutasController.prototype, "actualizarRuta", null);
exports.RutasController = RutasController = __decorate([
    (0, common_1.Controller)('rutas'),
    __metadata("design:paramtypes", [rutas_service_1.RutasService])
], RutasController);
//# sourceMappingURL=rutas.controller.js.map