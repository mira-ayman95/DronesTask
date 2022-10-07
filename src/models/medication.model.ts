import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Drone } from '../interfaces/drone.interface';
import { Medication } from '../interfaces/medication.interface';
import { DroneEntity } from './drone.model';

@Entity({ name: 'medications' })
export class MedicationEntity extends BaseEntity implements Medication {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    @Unique(['code'])
    code: string;


    @Column({ type: 'decimal' })
    weight: number;

    @Column()
    image: string;

    @ManyToOne(() => DroneEntity, (drone) => drone.medications, {
        cascade: true,
        nullable: false
    })
    drone: Drone;

    @Column()
    droneId: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}