import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json({ activities });
});

router.post('/', async (req, res) => {
  const created = await Activity.create(req.body);
  res.status(201).json({ activity: created });
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user').lean();
  if (!activity) return res.status(404).json({ message: 'Not found' });
  res.json({ activity });
});

router.put('/:id', async (req, res) => {
  const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ activity: updated });
});

router.delete('/:id', async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
