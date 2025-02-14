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

  // Create a new activity
  createActivity: async (req: Request<{}, {}, Partial<IActivity>>, res: Response): Promise<void> => {
    const activity = new Activity(req.body);
    try {
      const newActivity = await activity.save();
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  // Update an existing activity
  updateActivity: async (req: Request<{ id: string }, {}, Partial<IActivity>>, res: Response): Promise<void> => {
    try {
      const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedActivity);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  },

  // Delete an activity
  deleteActivity: async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      await Activity.findByIdAndDelete(req.params.id);
      res.json({ message: 'Activity deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}; 

export default ActivityController;