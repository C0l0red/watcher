import ServiceService from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { NextFunction, Request, Response } from 'express';
import { CallWatcherDto } from './dto/call-watcher.dto';

export default class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const createServiceDto: CreateServiceDto = req.body;
      const data = await this.serviceService.create(createServiceDto);

      res.json({ message: 'Service created successfully', data });
    } catch (error: any) {
      console.error(error);
      res.json({ message: 'An error occurred' });
      next();
    }
  }

  async callWatcher(req: Request, res: Response, next: NextFunction) {
    try {
      const callWatcherDto: CallWatcherDto = req.body;
      const data = await this.serviceService.watcher(callWatcherDto.time);

      res.json({ message: 'Services called', data });
    } catch (error) {
      console.error(error);
      res.json({ message: 'An error occurred' });
      next();
    }
  }
}
