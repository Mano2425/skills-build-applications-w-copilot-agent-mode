import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  createdAt: Date;
  profile?: {
    age?: number;
    heightCm?: number;
    weightKg?: number;
  };
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  createdAt: { type: Date, default: () => new Date() },
  profile: {
    age: Number,
    heightCm: Number,
    weightKg: Number,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
