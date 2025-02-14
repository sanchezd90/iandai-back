import { Request, Response } from 'express';
import Language from '../models/language';
import { ILanguage } from '../types';

interface LanguageController {
  getAllLanguages: (req: Request, res: Response) => Promise<void>;
  getLanguageById: (req: Request<{ languageId: string }>, res: Response) => Promise<void>;
  createLanguage: (req: Request<{}, {}, Partial<ILanguage>>, res: Response) => Promise<void>;
  updateLanguage: (req: Request<{ languageId: string }, {}, Partial<ILanguage>>, res: Response) => Promise<void>;
  deleteLanguage: (req: Request<{ languageId: string }>, res: Response) => Promise<void>;
}

const getAllLanguages: LanguageController['getAllLanguages'] = async (req: Request, res: Response): Promise<void> => {
  try {
    const languages = await Language.find();    
    res.json(languages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getLanguageById: LanguageController['getLanguageById'] = async (req: Request<{ languageId: string }>, res: Response): Promise<void> => {
  try {
    const language = await Language.findById(req.params.languageId);
    if (!language) {
      res.status(404).json({ message: 'Language not found' });
      return;
    }
    res.json(language);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createLanguage: LanguageController['createLanguage'] = async (req: Request<{}, {}, Partial<ILanguage>>, res: Response): Promise<void> => {
  try {
    const newLanguage = await Language.create(req.body);
    res.status(201).json(newLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateLanguage: LanguageController['updateLanguage'] = async (req: Request<{ languageId: string }, {}, Partial<ILanguage>>, res: Response): Promise<void> => {
  try {
    const updatedLanguage = await Language.findByIdAndUpdate(req.params.languageId, req.body, { new: true });
    if (!updatedLanguage) {
      res.status(404).json({ message: 'Language not found' });
      return;
    }
    res.json(updatedLanguage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteLanguage: LanguageController['deleteLanguage'] = async (req: Request<{ languageId: string }>, res: Response): Promise<void> => {
  try {
    const deletedLanguage = await Language.findByIdAndDelete(req.params.languageId);
    if (!deletedLanguage) {
      res.status(404).json({ message: 'Language not found' });
      return;
    }
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const languageController: LanguageController = {
  getAllLanguages,
  getLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
};

export default languageController; 