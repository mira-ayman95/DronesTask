import { Request, Response } from "express";
import { Medication } from "../interfaces/medication.interface";
import { medicationService } from "../services/medication.service";

class MedicationController {

    loadMedications = async (req: Request, res: Response) => {
        const medications: Medication[] = req.body;
        const droneId: number = parseInt(req.params.droneId);
        const loadedMedication: Medication[] = await medicationService.loadMedication(droneId, medications);
        return res.status(201).send({ data: loadedMedication, message: 'Medications added to this drone' });
    }

    getLoadedMedications = async (req: Request, res: Response) => {
        const droneId: number = parseInt(req.params.droneId);
        const loadedMedication: Medication[] = await medicationService.getLoadedMedications(droneId);
        return res.status(201).send({ data: loadedMedication, message: 'Medications loaded retrieved successfully' });
    }

}
export const medicationController = new MedicationController();