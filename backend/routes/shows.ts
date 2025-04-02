import express, { Request, Response } from 'express';
import Show, { IShow } from '../models/Show';

const router = express.Router();

// Get all shows
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const shows = await Show.find();
  res.json(shows);
});

// Get a specific show by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const show = await Show.findById(req.params.id);
  if (!show) {
    res.status(404).json({ message: 'Show not found' });
    return;
  }
  res.json(show);
});

export default router;