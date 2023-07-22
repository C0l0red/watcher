import { Schema, model } from 'mongoose';
import { Interval } from './interval';

const IntervalSchema: Schema = new Schema<Interval>({
  minutes: { type: Number, unique: true },
  urls: [String],
});

const IntervalModel = model<Interval>('Interval', IntervalSchema);

export default IntervalModel;
