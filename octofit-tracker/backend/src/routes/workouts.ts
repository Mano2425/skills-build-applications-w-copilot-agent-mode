import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'List workouts (placeholder)', workouts: [] });
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Create workout (placeholder)', payload: req.body });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'Get workout (placeholder)', id: req.params.id });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Update workout (placeholder)', id: req.params.id, payload: req.body });
});

router.delete('/:id', (req, res) => {
  res.status(204).send();
});

export default router;
