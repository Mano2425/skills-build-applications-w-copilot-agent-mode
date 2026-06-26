import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description?: string;
  exercises: { name: string; reps?: number; durationSec?: number }[];
  durationMin?: number;
}

const WorkoutSchema: Schema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: String,
  exercises: [
    {
      name: String,
      reps: Number,
      durationSec: Number,
    },
  ],
  durationMin: Number,
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
