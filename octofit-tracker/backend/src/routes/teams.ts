import { Router } from 'express';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json({ teams });
});

router.post('/', async (req, res) => {
  const created = await Team.create(req.body);
  res.status(201).json({ team: created });
});

router.get('/:id', async (req, res) => {
  const team = await Team.findById(req.params.id).populate('members').lean();
  if (!team) return res.status(404).json({ message: 'Not found' });
  res.json({ team });
});

router.put('/:id', async (req, res) => {
  const updated = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json({ team: updated });
});

router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
