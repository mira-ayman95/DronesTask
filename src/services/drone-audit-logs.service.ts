import { DroneEntity } from '../models/drone.model';
import { DroneAuditLogEntity } from "../models/drone-audit-log.model";

class DroneAuditService {

    async logDroneBattery() {
        const drones = await DroneEntity.find({ select: ["battery", "id"] })
        const createdLogsModel = DroneAuditLogEntity.create(drones.map(d => ({ battery: d.battery, droneId: d.id })));
        const createdLogs = await DroneAuditLogEntity.save(createdLogsModel);
        return createdLogs;
    }
}

export const droneAuditService = new DroneAuditService();