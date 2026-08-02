import { Request, Response } from 'express';
import { Team } from '../models';

export const listTeams = async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find().populate('members', 'username fullName level');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch teams', error });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id).populate('members', 'username fullName level');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch team', error });
  }
};

export const createTeam = async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body);
    await team.save();
    return res.status(201).json(team);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create team', error });
  }
};
