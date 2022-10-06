import { Drone } from '../interfaces/drone.interface';
import { DroneEntity } from '../models/drone.model';

class DroneService {

    async registerDrone(droneData: Drone) {
        const droneCount = await DroneEntity.count();
        if (droneCount >= 10) throw new BadRequest(`Maximum drone registers reached`);

        const isExistsDrone: Drone = await DroneEntity.findOne({ where: { serialNum: droneData.serialNum } });
        if (isExistsDrone) throw new BadRequest(`Drone with serial number: ${droneData.serialNum} already exists`);

        const createdDrone = await DroneEntity.create({
            ...droneData
        }).save();

        return createdDrone;
    }
}

export const droneService = new DroneService();