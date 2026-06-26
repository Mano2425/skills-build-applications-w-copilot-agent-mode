/**
 * Seed the octofit_db database with test data
 *
 * This script populates users, teams, activities, workouts, and leaderboard
 * collections with realistic sample data for development and testing.
 */

import { connectDatabase } from '../config/database';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import Workout from '../models/Workout';
import Leaderboard from '../models/Leaderboard';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await connectDatabase();

  // Clear existing data (use with caution in real environments)
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create sample users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com', profile: { age: 29, heightCm: 165, weightKg: 60 } },
    { name: 'Ben Carter', email: 'ben@example.com', profile: { age: 34, heightCm: 180, weightKg: 78 } },
    { name: 'Chloe Zhang', email: 'chloe@example.com', profile: { age: 24, heightCm: 158, weightKg: 54 } },
  ]);

  // Create teams
  const teams = await Team.create([
    { name: 'Marathoners', members: [users[0]._id, users[1]._id] },
    { name: 'Cyclone Squad', members: [users[1]._id, users[2]._id] },
  ]);

  // Create activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 10.5, durationMin: 52, date: new Date(), calories: 600 },
    { user: users[1]._id, type: 'ride', distanceKm: 35.2, durationMin: 95, date: new Date(), calories: 1200 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.2, durationMin: 40, date: new Date(), calories: 350 },
  ]);

  // Create workouts
  const workouts = await Workout.create([
    {
      title: 'Quick HIIT Blast',
      description: 'A short, intense interval session',
      exercises: [
        { name: 'Burpees', reps: 15 },
        { name: 'Jump Squats', reps: 20 },
        { name: 'Mountain Climbers', durationSec: 60 },
      ],
      durationMin: 20,
    },
    {
      title: 'Endurance Ride',
      description: 'Sustained steady-state cycling',
      exercises: [{ name: 'Cycling', durationSec: 3600 }],
      durationMin: 60,
    },
  ]);

  // Create leaderboard entries
  const leaderboard = await Leaderboard.create([
    { user: users[0]._id, score: 4200, period: 'monthly' },
    { user: users[1]._id, score: 5000, period: 'monthly' },
    { user: users[2]._id, score: 3100, period: 'monthly' },
  ]);

  console.log('Inserted:', {
    users: users.length,
    teams: teams.length,
    activities: activities.length,
    workouts: workouts.length,
    leaderboard: leaderboard.length,
  });

  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
