import ServiceService from './service.service';
import ServiceController from './service.controller';
import { intervalService } from '../interval';
import ServiceModel from './service.schema';
import { Router } from 'express';

const serviceService = new ServiceService(ServiceModel, intervalService);
const serviceController = new ServiceController(serviceService);

const router = Router();

router.post('', serviceController.create.bind(serviceController));
router.get('', serviceController.find.bind(serviceController));
router.get('/:name', serviceController.findOne.bind(serviceController));
router.post('/watcher', serviceController.callWatcher.bind(serviceController));

export default router;
