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
exports.PersonaEntity = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let PersonaEntity = class PersonaEntity {
    Cedula;
    Nombre;
    Apellido;
    Email;
    Telefono;
    Edad;
};
exports.PersonaEntity = PersonaEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonaEntity.prototype, "Cedula", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonaEntity.prototype, "Nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonaEntity.prototype, "Apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], PersonaEntity.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 12 }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PersonaEntity.prototype, "Telefono", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(18),
    (0, class_validator_1.Max)(130),
    __metadata("design:type", Number)
], PersonaEntity.prototype, "Edad", void 0);
exports.PersonaEntity = PersonaEntity = __decorate([
    (0, typeorm_1.Entity)('Persona')
], PersonaEntity);
//# sourceMappingURL=persona.entity.js.map