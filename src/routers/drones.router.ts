import { droneController } from '../controllers/drone.controller';
import { Router } from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { registerDrone } from '../utils/schema-validators/register-drone.validator';

const router = Router();

router.post('/', validationMiddleware(registerDrone), droneController.registerDrone);

export default router;