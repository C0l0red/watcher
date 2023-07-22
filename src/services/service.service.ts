import ServiceModel from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import IntervalService from '../interval/interval.service';

export default class ServiceService {
  constructor(
    private readonly serviceModel: typeof ServiceModel,
    private readonly intervalService: IntervalService,
  ) {}

  async create(dto: CreateServiceDto) {
    const service = await this.serviceModel.create(dto);
    await this.intervalService.registerService(service);
    return service;
  }

  async findOne(name: string) {
    return this.serviceModel.findOne({ name }).exec();
  }

  async find() {
    return this.serviceModel.find().exec();
  }

  async watcherSync(date = new Date()) {
    const minute = date.getMinutes() + date.getHours() * 60;

    const factorIntervals = this.intervalService.intervalMinutes.filter(
      (intervalMinute) => minute % intervalMinute == 0,
    );

    const urls = (
      await this.intervalService.find({ minutes: { $in: factorIntervals } })
    )
      .map((interval) => interval.urls)
      .flat(1);

    console.log(`[${date.toISOString()}] Services called [${urls.toString().replace(/,/g, ', ')}]`);

    return { urls };
  }
}
