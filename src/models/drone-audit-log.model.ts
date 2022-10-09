import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { DroneAuditLog } from '../interfaces/drone-audit-log.interface';
import { Drone } from '../interfaces/drone.interface';
import { DroneEntity } from './drone.model';

@Entity({ name: 'drone_logs' })
export class DroneAuditLogEntity extends BaseEntity implements DroneAuditLog {
    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    battery: number;

    @ManyToOne(() => DroneEntity, (drone) => drone.log, {
        cascade: true,
        nullable: false
    })
    drone: Drone;

    @Column()
    droneId: number;

    @Column()
    @CreateDateColumn()
    createdAt: Date;
}
