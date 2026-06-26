import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit';
const PORT = Number(process.env.PORT) || 8000;

const app = express();
app.use(express.json());

// Codespaces-aware API URL support
// Prefer explicit API_URL env var; otherwise when running in Codespaces use the
// pattern: https://$CODESPACE_NAME-8000.app.github.dev (GitHub Codespaces preview)
const API_URL = process.env.API_URL || (process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev` : `http://localhost:${PORT}`);

// Simple CORS handling: allow frontend origin if provided, else allow all. When
// running in Codespaces expose the Codespaces preview host.
const FRONTEND_URL = process.env.FRONTEND_URL || (process.env.CODESPACE_NAME ? `https://${process.env.CODESPACE_NAME}-5173.app.github.dev` : '*');
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL === '*' ? '*' : FRONTEND_URL);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/health', (_req, res) => res.json({ status: 'ok', apiUrl: API_URL }));

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to MongoDB at ${MONGO_URL}`);
    console.log(`API URL: ${API_URL}`);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

start();
