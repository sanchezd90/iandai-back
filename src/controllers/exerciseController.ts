import { Request, Response } from 'express';
import Exercise from '../models/exercise';
import { IExercise } from '../types';

interface ExerciseController {
  createExercise: (req: Request<{}, {}, Partial<IExercise>>, res: Response) => Promise<void>;
  getAllExercises: (req: Request, res: Response) => Promise<void>;
  getExerciseById: (req: Request<{ exerciseId: string }>, res: Response) => Promise<void>;
  updateExercise: (req: Request<{ id: string }, {}, Partial<IExercise>>, res: Response) => Promise<void>;
  deleteExercise: (req: Request<{ id: string }>, res: Response) => Promise<void>;
}

// Create a new exercise
const createExercise = async (req: Request<{}, {}, Partial<IExercise>>, res: Response): Promise<void> => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

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

// Update an exercise by ID
const updateExercise = async (req: Request<{ id: string }, {}, Partial<IExercise>>, res: Response): Promise<void> => {
  try {
    const exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

// Delete an exercise by ID
const deleteExercise = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }
    res.status(200).json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

const exerciseController: ExerciseController = {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise,
};

export default exerciseController; 