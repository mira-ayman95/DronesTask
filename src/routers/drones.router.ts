import { droneController } from '../controllers/drone.controller';
import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { registerDrone } from '../utils/schema-validators/register-drone.validator';
import { loadMedication } from '../utils/schema-validators/load-medication.validator';
import { medicationController } from '../controllers/medication.controller';
import { droneParams } from '../utils/schema-validators/drone-params.validator';

const router = Router();

router.post('/', validationMiddleware({ body: registerDrone }), droneController.registerDrone);
router.get('/:droneId', validationMiddleware({ params: droneParams }), droneController.getDrone);
router.post('/:droneId/medications', validationMiddleware({ body: loadMedication, params: droneParams }), medicationController.loadMedications);
router.get('/:droneId/medications', validationMiddleware({ params: droneParams }), medicationController.getLoadedMedications);

export default router;