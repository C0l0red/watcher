import { Types } from 'mongoose';

export interface Service extends Document {
  name: string;
  url: string;
  intervalInMinutes: number;
}
