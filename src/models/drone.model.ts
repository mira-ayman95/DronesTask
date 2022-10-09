import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Drone, DroneModelEnum, DroneStateEnum } from '../interfaces/drone.interface';
import { DroneAuditLogEntity } from './drone-audit-log.model';
import { MedicationEntity } from './medication.model';

@Entity({ name: 'drones' })
export class DroneEntity extends BaseEntity implements Drone {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Unique(['serialNum'])
    serialNum: string;

    @Column({
        type: 'enum',
        enum: DroneModelEnum
    })
    model: DroneModelEnum;

    @Column({ type: 'decimal' })
    weight: number;

    @Column({
        type: 'enum',
        enum: DroneStateEnum,
        default: DroneStateEnum.IDLE
    })
    state: DroneStateEnum;

    @Column({ default: 100 })
    battery: number;

    @OneToMany(() => MedicationEntity, (medication) => medication.drone)
    medications: MedicationEntity[]

    @OneToMany(() => DroneAuditLogEntity, (auditLog) => auditLog.drone)
    log: DroneAuditLogEntity[]

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
