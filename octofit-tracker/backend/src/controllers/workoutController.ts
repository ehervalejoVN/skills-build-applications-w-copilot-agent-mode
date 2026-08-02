import { Request, Response } from 'express';
import { WorkoutSuggestion } from '../models';

export const listWorkoutSuggestions = async (_req: Request, res: Response) => {
  try {
    const suggestions = await WorkoutSuggestion.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch workout suggestions', error });
  }
};

export const createWorkoutSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = new WorkoutSuggestion(req.body);
    await suggestion.save();
    return res.status(201).json(suggestion);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create workout suggestion', error });
  }
};
