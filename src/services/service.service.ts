import ServiceModel from './service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import CallTimeService from '../call-times/call-time.service';

export default class ServiceService {
  constructor(
    private readonly serviceModel: typeof ServiceModel,
    private readonly callTimeService: CallTimeService,
  ) {}

  async create(dto: CreateServiceDto) {
    const service = await this.serviceModel.create(dto);
    const callTimes = await this.callTimeService.bulkCreate(service);
    if (callTimes)
      service.callTimes = callTimes.map((callTime) => callTime._id);

    return service.save();
  }

  async findOne(name: string) {
    return this.serviceModel.findOne({name}).exec();
  }

  async find() {
    return this.serviceModel.find({}, {_id: 1, name: 1, url: 1, intervalInMinutes: 1}).exec();
  }

  async watcher(time: string) {
    const callTimes = await this.callTimeService.getForTime(time);
    const urls = callTimes.map((callTime) => callTime.url);
    console.log(`[${time}]: called services [${urls.toString().replace(/,/g, ", ")}]`);

    return { urls };
  }
}
