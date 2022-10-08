import { Request, Response } from "express";
import { Drone } from "../interfaces/drone.interface";
import { droneService } from "../services/drone.service";



class DroneController {

    registerDrone = async (req: Request, res: Response) => {
        const droneData: Drone = req.body;
        const registeredDrone: Drone = await droneService.registerDrone(droneData);
        return res.status(201).send({ data: registeredDrone, message: 'drone registered successfully' });
    }

    getDrone = async (req: Request, res: Response) => {
        const droneId: number = parseInt(req.params.droneId);
        const drone = await droneService.getDrone(droneId);
        return res.send({ data: drone, message: 'drone retrieved successfully' });
    }

    getDrones = async (req: Request, res: Response) => {
        const filterQuery = req.query;
        const availableLoadingDrones: Drone[] = await droneService.getDrones(filterQuery);
        return res.send({ data: availableLoadingDrones, message: 'available drones for loading retrieved successfully' });
    }

}
export const droneController = new DroneController();