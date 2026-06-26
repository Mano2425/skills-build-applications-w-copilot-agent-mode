import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboard extends Document {
  user: Types.ObjectId;
  score: number;
  period: string;
}

const LeaderboardSchema: Schema = new Schema<ILeaderboard>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  period: { type: String, default: 'all-time' },
});

export default mongoose.model<ILeaderboard>('Leaderboard', LeaderboardSchema);
