import IntervalService from './interval.service';
import IntervalModel from './interval.schema';

const intervalService = new IntervalService(IntervalModel);

export { intervalService };
