import { Request, Response } from 'express';
import Exercise from '../models/exercise';
import { IExercise } from '../types';

interface ExerciseController {  
  getAllExercises: (req: Request, res: Response) => Promise<void>;
  getExerciseById: (req: Request<{ exerciseId: string }>, res: Response) => Promise<void>;    
}

// Get all exercises with related activity data
const getAllExercises = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Get an exercise by ID with related activity data
const getExerciseById = async (req: Request<{ exerciseId: string }>, res: Response): Promise<void> => {
  try {
    const exercise = await Exercise.findById(req.params.exerciseId).populate('activity');
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const exerciseController: ExerciseController = {
  getAllExercises,
  getExerciseById,
};

export default exerciseController; 