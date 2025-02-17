import { Request, Response } from 'express';
import Activity from '../models/activity';
import { IActivity } from '../types';

export const ActivityController = {
  // Get all activities with related exercises
  getAllActivities: async (req: Request, res: Response): Promise<void> => {
    try {
      const activities = await Activity.find().populate('exercises');
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  // Get one activity by ID with related exercises
  getActivityById: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const activity = await Activity.findById(req.params.id).populate('exercises');
      if (activity) {
        res.json(activity);
      } else {
        res.status(404).json({ message: 'Activity not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  },
}; 

export default ActivityController;