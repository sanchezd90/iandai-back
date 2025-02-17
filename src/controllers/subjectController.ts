import { Request, Response } from 'express';
import Subject from '../models/subject';

// Method to get all subjects
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error });
  }
};

// Method to get a subject by ID
export const getSubjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const subject = await Subject.findById(req.params.subjectId);
    if (!subject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error });
  }
};


export default { getAll, getSubjectById };