import CallTimeModel from './call-time.schema';
import { HydratedDocument } from 'mongoose';
import { Service } from '../services/service';
import { CallTime } from './call-time';

export default class CallTimeService {
  constructor(private readonly callTimeModel: typeof CallTimeModel) {}

  async bulkCreate(
    service: HydratedDocument<Service>,
  ): Promise<HydratedDocument<CallTime>[] | void> {
    const times = this.generateTimesForInterval(service.intervalInMinutes);
    const callTimes: CallTime[] = times.map(
      (time) =>
        ({
          time,
          service: service._id,
          url: service.url,
        } as CallTime),
    );

    return this.callTimeModel
      .insertMany(callTimes)
      .then((callTimes) => callTimes)
      .catch((err) =>
        console.error('An error occurred while generating call times', err),
      );
  }

  async getForTime(time: string) {
    return this.callTimeModel.find({ time }).exec();
  }

  private generateTimesForInterval(intervalInMinutes: number): string[] {
    const times: string[] = [];
    let hour = 0,
      minute = 0;

    while (hour < 24) {
      let currentMinute = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      times.push(currentMinute);

      minute += intervalInMinutes;

      while (minute >= 60) {
        hour++;
        minute -= 60;
      }
    }

    return times;
  }
}
