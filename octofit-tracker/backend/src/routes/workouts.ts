import { Router } from 'express';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json({ workouts });
});

router.post('/', async (req, res) => {
  const created = await Workout.create(req.body);
  res.status(201).json({ workout: created });
});

router.get('/:id', async (req, res) => {
  const workout = await Workout.findById(req.params.id).lean();
  if (!workout) return res.status(404).json({ message: 'Not found' });
  res.json({ workout });
});

router.put('/:id', async (req, res) => {
  const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ workout: updated });
});

router.delete('/:id', async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
