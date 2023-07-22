import IntervalModel from './interval.schema';
import { HydratedDocument } from 'mongoose';
import { Service } from '../services/service';
import { Interval } from './interval';
import { create } from 'domain';

export default class IntervalService {
  intervalMinutes: number[] = [];
  constructor(private readonly intervalModel: typeof IntervalModel) {
    this.find()
      .then((intervals) => intervals.map((interval) => interval.minutes))
      .then((intervalMinutes) => {
        this.intervalMinutes = intervalMinutes;
      });
  }

  async create(minutes: number): Promise<HydratedDocument<Interval>> {
    return this.intervalModel
      .create({ minutes })
      .then((interval) => {
        this.intervalMinutes.push(interval.minutes);
        return interval;
      })
      .catch(() => {
        throw new Error(
          `Could not create interval for ${minutes} minutes. Ensure it does not exist`,
        );
      });
  }

  async registerService(service: Service) {
    const interval = await this.intervalModel
      .findOne({ minutes: service.intervalInMinutes })
      .exec()
      .then(
        async (interval) =>
          interval || (await this.create(service.intervalInMinutes)),
      );

    interval.urls.push(service.url);
    await interval.save();
  }

  async find(filter?: {[P in keyof Interval]?: any}): Promise<HydratedDocument<Interval>[]> {
    return this.intervalModel.find(filter || {}).exec();
  }
}
