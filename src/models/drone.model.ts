import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Drone, DroneModelEnum, DroneStateEnum } from '../interfaces/drone.interface';

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

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
}
