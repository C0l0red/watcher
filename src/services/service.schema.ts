import { Schema, model } from 'mongoose';
import { Service } from './service';

const ServiceSchema: Schema = new Schema<Service>({
  name: { type: String, unique: true },
  url: { type: String, unique: true },
  intervalInMinutes: Number,
});

const ServiceModel = model<Service>('Service', ServiceSchema);

export default ServiceModel;
