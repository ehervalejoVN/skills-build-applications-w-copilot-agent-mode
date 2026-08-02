import { Request, Response } from 'express';

export const getHealth = (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running'
  });
};
