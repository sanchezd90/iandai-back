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

// Method to create a new subject
export const createSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const newSubject = new Subject(req.body);
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error });
  }
};

// Method to update a subject by ID
export const updateSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.subjectId, req.body, { new: true });
    if (!updatedSubject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error });
  }
};

// Method to delete a subject by ID
export const deleteSubject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.subjectId);
    if (!deletedSubject) {
      res.status(404).json({ message: 'Subject not found' });
      return;
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error });
  }
};

export default { getAll, getSubjectById, createSubject, updateSubject, deleteSubject };