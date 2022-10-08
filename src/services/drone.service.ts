import { Drone } from '../interfaces/drone.interface';
import { DroneEntity } from '../models/drone.model';
import { Any, MoreThanOrEqual } from "typeorm"
import { BadRequestException } from '../utils/exceptions/bad-request.exception';
import { NotFoundException } from '../utils/exceptions/not-found.exception';

class DroneService {

    async registerDrone(droneData: Drone) {
        const droneCount = await DroneEntity.count();
        if (droneCount >= 10) throw new BadRequestException(`Maximum drone registers reached`);

        const isExistsDrone: Drone = await DroneEntity.findOne({ where: { serialNum: droneData.serialNum } });
        if (isExistsDrone) throw new BadRequestException(`Drone with serial number: ${droneData.serialNum} already exists`);

        const createdDrone = await DroneEntity.create({
            ...droneData
        }).save();

        return createdDrone;
    }
    async getDrone(droneId: number) {
        const drone = await DroneEntity.findOne({ where: { id: droneId }, select: ['battery'] })
        if (!drone) throw new NotFoundException(`Drone ID not found`);
        return drone;
    }

    async getDrones(filter) {
        const drones: Drone[] = await DroneEntity.find({
            where: {
                state: Any(['idle', 'loading']),
                battery: MoreThanOrEqual(25),
                // weight: sumMedicationsWeight < weight 
            }
        });
        return drones;
    }
}

export const droneService = new DroneService();