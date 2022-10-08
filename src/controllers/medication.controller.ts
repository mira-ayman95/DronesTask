import { Request, Response } from "express";
import { Medication } from "../interfaces/medication.interface";
import { medicationService } from "../services/medication.service";

class MedicationController {
    loadMedications = async (req: Request, res: Response) => {
        try {
            const medications: Medication[] = req.body;
            const droneId: number = parseInt(req.params.droneId);
            const loadedMedication: Medication[] = await medicationService.loadMedication(droneId, medications);
            res.status(201).json({ data: loadedMedication, message: 'Medications added to this drone' });
        } catch (error) {
            res.status(400).json({ error, message: error.message })
        }
    }
    getLoadedMedications = async (req: Request, res: Response) => {
        try {
            const droneId: number = parseInt(req.params.droneId);
            const loadedMedication: Medication[] = await medicationService.getLoadedMedications(droneId);
            res.status(201).json({ data: loadedMedication, message: 'Medications loaded retrieved successfully' });
        } catch (error) {
            console.log('error', error);
            res.status(400).json({ error, message: error.message })
        }
    }
}
export const medicationController = new MedicationController();