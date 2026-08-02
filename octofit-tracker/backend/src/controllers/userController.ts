import { Request, Response } from 'express';
import { User } from '../models';

export const listUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().populate('team', 'name sport color');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch users', error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).populate('team', 'name sport color');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch user', error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create user', error });
  }
};
