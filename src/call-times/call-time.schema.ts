import { Schema, model } from 'mongoose';
import { CallTime } from './call-time';

const CallTimeSchema: Schema = new Schema<CallTime>({
  time: String,
  url: String,
  service: Schema.Types.ObjectId,
});

const CallTimeModel = model<CallTime>('CallTime', CallTimeSchema);

export default CallTimeModel;
