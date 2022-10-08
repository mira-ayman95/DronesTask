jest.mock('../models/drone.model');
import { Any, MoreThanOrEqual } from "typeorm";
import { DroneModelEnum } from "../interfaces/drone.interface";
import { DroneEntity } from "../models/drone.model";
import { droneService } from "../services/drone.service";
import { BadRequestException } from "../utils/exceptions/bad-request.exception";
import { NotFoundException } from "../utils/exceptions/not-found.exception";

describe('drone.service', () => {

    describe('registerDrone', () => {

        it('should register drone successfully', async () => {
            DroneEntity.count = jest.fn().mockResolvedValue(5);
            DroneEntity.findOne = jest.fn().mockResolvedValue(null);
            DroneEntity.create = jest.fn().mockReturnValue({
                save: jest.fn().mockResolvedValue("test")
            })

            const drone = await droneService.registerDrone({
                serialNum: "test-serial",
                model: DroneModelEnum.LIGHTWEIGHT,
                weight: 100
            });

            expect(DroneEntity.create).toBeCalledWith({
                serialNum: "test-serial",
                model: DroneModelEnum.LIGHTWEIGHT,
                weight: 100
            });
            expect(DroneEntity.findOne).toBeCalledWith({ where: { serialNum: "test-serial" } });
            expect(drone).toEqual('test');
        });

        it('should fail if drone count bigger than 10', async () => {
            DroneEntity.count = jest.fn().mockResolvedValue(10);
            const drone = droneService.registerDrone({
                serialNum: "test-serial",
                model: DroneModelEnum.LIGHTWEIGHT,
                weight: 100
            });
            await expect(drone).rejects.toThrowError(new BadRequestException("Maximum drone registers reached"));
        });

        it('should fail if drone serial already exists', async () => {
            DroneEntity.count = jest.fn().mockResolvedValue(5);
            DroneEntity.findOne = jest.fn().mockResolvedValue("drone");
            const drone = droneService.registerDrone({
                serialNum: "test-serial",
                model: DroneModelEnum.LIGHTWEIGHT,
                weight: 100
            });
            await expect(drone).rejects.toThrowError(new BadRequestException("Drone with serial number: test-serial already exists"));
        });

    });

    describe('getDrone', () => {

        it('should get drone successfully', async () => {
            DroneEntity.findOne = jest.fn().mockResolvedValue("test");

            const drone = await droneService.getDrone(3);

            expect(DroneEntity.findOne).toBeCalledWith({ where: { id: 3 }, select: ['battery'] });
            expect(drone).toEqual('test');
        });

        it('should fail if drone not found', async () => {
            DroneEntity.findOne = jest.fn().mockResolvedValue(null);
            const drone = droneService.getDrone(3);
            expect(DroneEntity.findOne).toBeCalledWith({ where: { id: 3 }, select: ['battery'] });
            await expect(drone).rejects.toThrowError(new NotFoundException("Drone ID not found"));
        });
    });
    describe('getDrones', () => {

        it('should get available drones successfully', async () => {
            DroneEntity.find = jest.fn().mockResolvedValue("test");

            const drones = await droneService.getDrones({});

            expect(DroneEntity.find).toBeCalledWith({
                where: {
                    state: Any(['idle', 'loading']),
                    battery: MoreThanOrEqual(25),
                }
            });
            expect(drones).toEqual('test');
        });
    });
});
