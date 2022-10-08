import { Any } from "typeorm";
import { DroneStateEnum } from "../interfaces/drone.interface";
import { Medication } from "../interfaces/medication.interface";
import { DroneEntity } from "../models/drone.model";
import { MedicationEntity } from "../models/medication.model";
import { BadRequest } from "../utils/exceptions/bad-request.exception";

class MedicationService {

    async loadMedication(droneId: number, medications: Medication[]) {

        const drone: DroneEntity & { medicationsWeight: number } = await DroneEntity.createQueryBuilder('drones')
            .select(`
            drones.*,
            (SELECT SUM(weight) FROM medications WHERE medications."droneId" = ${droneId}) as "medicationsWeight"
            `)
            .where(`drones.id = ${droneId}`)
            .getRawOne();

        //drone found
        if (!drone) throw new BadRequest(`Drone ID not found`);
        console.log('drone.medications.id', drone.medicationsWeight);

        //drone cant load because of battery below 25  
        if (drone.battery < 25) throw new BadRequest(`Can't load Medications, Drone battery is ${drone.battery}%`);

        //drone already loaded or fully loaded by status or weights
        if (drone.state === DroneStateEnum.LOADED || (drone.medicationsWeight == Number(drone.weight))) throw new BadRequest(`Drone is already Full of Medications`);

        // drone medications coming more than drone weight limit
        const weightSum: any = medications.reduce((prev: Medication, current: Medication): any => (prev?.weight || 0) + current.weight);
        const totalWeight: number = Number(weightSum) + Number(drone.medicationsWeight);

        if (totalWeight > Number(drone.weight)) throw new BadRequest(`Can't load those Medications to this Drone, Drone weight limit is ${drone.weight}`);


        // to save medications check that codes is unique 
        const existingCodes = await MedicationEntity.find({ where: { code: Any(medications.map(m => m.code)) }, select: ['code'] });
        if (existingCodes.length > 0) throw new BadRequest(`Codes ${existingCodes.map(m => m.code).join(', ')} already exist`);

        // save medication to drone
        const medicationsModel = MedicationEntity.create(medications.map(m => ({ ...m, droneId: drone.id })));
        const loadedMedications = await MedicationEntity.save(medicationsModel);

        // updateStateDrone if it was fully loaded
        if (totalWeight == drone.weight) DroneEntity.update({ id: droneId }, { state: DroneStateEnum.LOADED })

        //update drone state to be in loading when more medication weight can be loaded to drone
        if (totalWeight < drone.weight && drone.state !== DroneStateEnum.LOADING) DroneEntity.update({ id: droneId }, { state: DroneStateEnum.LOADING })

        return loadedMedications;
    }
    async getLoadedMedications(droneId: number) {

        const drone = await DroneEntity.findOne({ where: { id: droneId } })
        if (!drone) throw new BadRequest(`Drone ID not found`);

        const medications = await MedicationEntity.createQueryBuilder('medications')
            .select(`medications.*`)
            .innerJoin("medications.drone", "drone")
            .where(`medications.droneId = ${droneId}`)
            .getRawMany();
        return medications;
    }
}

export const medicationService = new MedicationService();