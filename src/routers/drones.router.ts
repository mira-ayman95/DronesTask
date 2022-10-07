import { droneController } from '../controllers/drone.controller';
import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { registerDrone } from '../utils/schema-validators/register-drone.validator';
import { droneParams } from '../utils/schema-validators/drone-params.validator';

const router = Router();

router.post('/', validationMiddleware({ body: registerDrone }), droneController.registerDrone);
router.get('/:droneId', validationMiddleware({ params: droneParams }), droneController.getDrone);

export default router;