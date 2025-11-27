import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { IsEmail, IsNotEmpty, Min, Max } from 'class-validator';
import { CooperativaEntity } from "./cooperativa.entity";


@Entity('ruta')
export class RutaEntity {
    @PrimaryColumn({ type: 'varchar', length: 50})
    @IsNotEmpty()
    numero_ruta : string;


    @Column({ type: 'varchar', length: 50 })   
    @IsNotEmpty()
    nombre : string;

    @Column({ type: 'text' }) 
    @IsNotEmpty()
    descripcion : string;

    @Column({ type: 'int' }) 
    @IsNotEmpty()
    tarifa : number;

    @Column({ type: 'int' }) 
    @IsNotEmpty()
    origen_id : number;

    @Column({ type: 'int' }) 
    @IsNotEmpty()
    destino_id : number;

    @ManyToOne(() => CooperativaEntity, cooperativa => cooperativa.rutas)
    @JoinColumn({ name: 'cooperativa_id'})
    cooperativa: CooperativaEntity;
}