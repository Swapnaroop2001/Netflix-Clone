import express, { Request, Response } from 'express';
import authMiddleware from '../middleware/auth';
import User, { IUser } from '../models/User';

const router = express.Router();

// Add show to watchlist
router.post('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const { showId } = req.body;
  const user = await User.findById(req.user);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  if (user.watchlist.includes(showId)) {
    res.status(400).json({ message: 'Show already in watchlist' });
    return;
  }
  user.watchlist.push(showId);
  await user.save();
  res.json({ message: 'Show added to watchlist' });
});

// Get user's watchlist
router.get('/', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user).populate('watchlist');
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user.watchlist);
});

export default router;