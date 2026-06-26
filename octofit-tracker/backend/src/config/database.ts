import mongoose from 'mongoose';

// Database configuration for octofit_db using mongoose
// Uses local MongoDB at port 27017 by default
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  return mongoose.connect(MONGO_URL);
}

export default mongoose;
