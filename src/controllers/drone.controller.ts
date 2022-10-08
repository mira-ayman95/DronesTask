import { Request, Response } from "express";
import { Drone } from "../interfaces/drone.interface";
import { droneService } from "../services/drone.service";



class DroneController {
    registerDrone = async (req: Request, res: Response) => {
        try {
            const droneData: Drone = req.body;
            const registeredDrone: Drone = await droneService.registerDrone(droneData);
            res.status(201).json({ data: registeredDrone, message: 'drone registered successfully' });
        } catch (error) {
            res.status(400).json({ error, message: error.message })
        }
    }
    getDrone = async (req: Request, res: Response) => {
        try {
            const droneId: number = parseInt(req.params.droneId);
            const drone = await droneService.getDrone(droneId);
            res.status(200).json({ data: drone, message: 'drone retrieved successfully' });
        } catch (error) {
            res.status(400).json({ error, message: error.message })
        }
    }
    getDrones = async (req: Request, res: Response) => {
        try {
            const filterQuery = req.query;
            const availableLoadingDrones: Drone[] = await droneService.getDrones(filterQuery);
            res.status(200).json({ data: availableLoadingDrones, message: 'available drones for loading retrieved successfully' });
        } catch (error) {
            res.status(400).json({ error, message: error.message })
        }
    }
}
export const droneController = new DroneController();