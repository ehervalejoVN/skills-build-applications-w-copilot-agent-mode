import { Request, Response } from 'express';
import { Activity } from '../models';

export const listActivities = async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find().sort({ date: -1 }).populate('user', 'username fullName');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch activities', error });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    return res.status(201).json(activity);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create activity', error });
  }
};
