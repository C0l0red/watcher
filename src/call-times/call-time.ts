import { Types, Document } from 'mongoose';

export interface CallTime extends Document {
  time: string;
  url: string;
  service: Types.ObjectId;
}
