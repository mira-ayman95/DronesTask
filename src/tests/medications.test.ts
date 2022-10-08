jest.mock('../models/drone.model');
jest.mock('../models/medication.model');
import { Any } from "typeorm";
import { DroneModelEnum } from "../interfaces/drone.interface";
import { DroneEntity } from "../models/drone.model";
import { MedicationEntity } from "../models/medication.model";
import { medicationService } from "../services/medication.service";
import { BadRequestException } from "../utils/exceptions/bad-request.exception";
import { NotFoundException } from "../utils/exceptions/not-found.exception";

describe('medications.service', () => {

    describe('loadMedication', () => {

        it('should load drone successfully', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue({ battery: 100, weight: 200, medicationsWeight: 50 })

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);
            MedicationEntity.find = jest.fn().mockResolvedValue([]);

            MedicationEntity.create = jest.fn().mockReturnValue("test")
            MedicationEntity.save = jest.fn().mockResolvedValue("test")

            const medications = await medicationService.loadMedication(3, [{ weight: 50, code: "CC2", image: "jsj", name: "jsjj" }]);

            expect(MedicationEntity.create).toBeCalledWith([{ weight: 50, code: "CC2", image: "jsj", name: "jsjj" }]);
            expect(medications).toEqual('test');
        });

        it('should fails if drone if not found', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue(null)

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);

            const medications = medicationService.loadMedication(3, [{ weight: 1, code: "CC2", image: "jsj", name: "jsjj" }]);

            await expect(medications).rejects.toThrowError(new NotFoundException("Drone ID not found"));
        });

        it('should fails if drone if battery < 25', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue({ battery: 10 })

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);

            const medications = medicationService.loadMedication(3, [{ weight: 1, code: "CC2", image: "jsj", name: "jsjj" }]);

            await expect(medications).rejects.toThrowError(new BadRequestException(`Can't load Medications, Drone battery is 10%`));
        });

        it('should fails if drone if weight limit reached', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue({ battery: 100, weight: 100, medicationsWeight: 100 })

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);

            const medications = medicationService.loadMedication(3, [{ weight: 1, code: "CC2", image: "jsj", name: "jsjj" }]);

            await expect(medications).rejects.toThrowError(new BadRequestException(`Drone reached Max weight limit`));
        });

        it('should fails if medications weight > drone weight', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue({ battery: 100, weight: 100, medicationsWeight: 50 })

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);

            const medications = medicationService.loadMedication(3, [{ weight: 70, code: "CC2", image: "jsj", name: "jsjj" }]);

            await expect(medications).rejects.toThrowError(new BadRequestException(`Can't load those Medications to this Drone, Drone weight limit is 100`));
        });

        it('should fails if medications codes already exists', async () => {
            const queryBuilder: any = {};
            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawOne = jest.fn().mockResolvedValue({ battery: 100, weight: 200, medicationsWeight: 50 })

            DroneEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);
            MedicationEntity.find = jest.fn().mockResolvedValue([{ code: "CC2" }]);


            const medications = medicationService.loadMedication(3, [{ weight: 50, code: "CC2", image: "jsj", name: "jsjj" }]);
            await expect(medications).rejects.toThrowError(new BadRequestException(`Codes CC2 already exist`));
        });

    });

    describe('getLoadedMedications', () => {

        it('should get loaded medications successfully', async () => {
            DroneEntity.findOne = jest.fn().mockResolvedValue("test");

            const queryBuilder: any = {};

            queryBuilder.select = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.innerJoin = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.where = jest.fn().mockReturnValue(queryBuilder)
            queryBuilder.getRawMany = jest.fn().mockResolvedValue("testAll")


            MedicationEntity.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);
            const medications = await medicationService.getLoadedMedications(3);

            expect(DroneEntity.findOne).toBeCalledWith({ where: { id: 3 } });

            expect(medications).toEqual('testAll');
        });

        it('should fails if drone if not found', async () => {
            DroneEntity.findOne = jest.fn().mockResolvedValue(null);
            const medications = medicationService.getLoadedMedications(3);

            expect(DroneEntity.findOne).toBeCalledWith({ where: { id: 3 } });
            await expect(medications).rejects.toThrowError(new NotFoundException("Drone ID not found"));
        });
    });
});
