import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'Leaderboard (placeholder)', leaderboard: [] });
});

export default router;
