import ServiceService from './service.service';
import ServiceController from './service.controller';
import { callTimeService } from '../call-times';
import ServiceModel from './service.schema';
import { Router } from 'express';

const serviceService = new ServiceService(ServiceModel, callTimeService);
const serviceController = new ServiceController(serviceService);

const router = Router();

router.post('', serviceController.create.bind(serviceController));
router.post('/watcher', serviceController.callWatcher.bind(serviceController));

export default router;
