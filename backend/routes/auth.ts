import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

// Signup route
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email, and password are required' });
    return;
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    res.status(400).json({ 
      message: existingUser.username === username ? 
        'Username already exists' : 
        'Email already exists' 
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ 
    username, 
    email, 
    password: hashedPassword, 
    watchlist: [] 
  });
  
  await newUser.save();
  res.status(201).json({ message: 'User created successfully' });
});

// Login route
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body; // identifier can be either username or email
  if (!identifier || !password) {
    res.status(400).json({ message: 'Identifier and password are required' });
    return;
  }

  const user = await User.findOne({ 
    $or: [{ username: identifier }, { email: identifier }] 
  });

  if (!user) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
});

export default router;