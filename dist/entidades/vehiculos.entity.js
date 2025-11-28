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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiculosEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const cooperativa_entity_1 = require("./cooperativa.entity");
let VehiculosEntity = class VehiculosEntity {
    placa;
    modelo;
    color;
    anofabricacion;
    cooperativa;
};
exports.VehiculosEntity = VehiculosEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculosEntity.prototype, "placa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculosEntity.prototype, "modelo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], VehiculosEntity.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], VehiculosEntity.prototype, "anofabricacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cooperativa_entity_1.CooperativaEntity, cooperativa => cooperativa.unidad),
    (0, typeorm_1.JoinColumn)({ name: 'cooperativa_id' }),
    __metadata("design:type", cooperativa_entity_1.CooperativaEntity)
], VehiculosEntity.prototype, "cooperativa", void 0);
exports.VehiculosEntity = VehiculosEntity = __decorate([
    (0, typeorm_1.Entity)('vehiculos')
], VehiculosEntity);
//# sourceMappingURL=vehiculos.entity.js.map