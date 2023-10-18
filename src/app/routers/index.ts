import { Router } from 'express';
import { HealthyController } from 'modules/common/controllers/healthy_controller';
import { v1Router } from './v1/index';

export const router = Router();

const healthyController = new HealthyController();

router.use(v1Router);
router.get('/', healthyController.get);
router.get('/health', healthyController.health);
router.get('/readiness', healthyController.readiness);
