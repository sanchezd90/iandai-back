import { Request, Response } from 'express';
import Language from '../models/language';
import { ILanguage } from '../types';

interface LanguageController {
  getAllLanguages: (req: Request, res: Response) => Promise<void>;
  getLanguageById: (req: Request<{ languageId: string }>, res: Response) => Promise<void>;      
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

const languageController: LanguageController = {
  getAllLanguages,
  getLanguageById,
};

export default languageController; 