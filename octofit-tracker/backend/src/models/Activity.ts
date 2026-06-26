import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: string;
  distanceKm?: number;
  durationMin?: number;
  date: Date;
  calories?: number;
}

const ActivitySchema: Schema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: Number,
  durationMin: Number,
  date: { type: Date, default: () => new Date() },
  calories: Number,
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);
