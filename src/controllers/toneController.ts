import { Request, Response } from 'express';
import Tone from '../models/tone';

// Method to get all tones
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const tones = await Tone.find();
    res.status(200).json(tones);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tones', error });
  }
};

export default { getAll };