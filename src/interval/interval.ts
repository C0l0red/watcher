import { Types, Document } from 'mongoose';

export interface Interval extends Document {
  minutes: number;
  urls: string[];
}
