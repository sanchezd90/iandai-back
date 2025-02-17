import { Request, Response } from 'express';
import Word from '../models/word';
import { IWord } from '../types/models';

interface WordController {
  getAllWords: (req: Request, res: Response) => Promise<void>;
  getWordById: (req: Request<{ wordId: string }>, res: Response) => Promise<void>;
  createWord: (req: Request<{}, {}, Partial<IWord>>, res: Response) => Promise<void>;  
  deleteWord: (req: Request<{ wordId: string }>, res: Response) => Promise<void>;
}

const getAllWords: WordController['getAllWords'] = async (req: Request, res: Response): Promise<void> => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWordById: WordController['getWordById'] = async (req: Request<{ wordId: string }>, res: Response): Promise<void> => {
  try {
    const word = await Word.findById(req.params.wordId);
    if (!word) {
      res.status(404).json({ message: 'Word not found' });
      return;
    }
    res.json(word);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createWord: WordController['createWord'] = async (req: Request<{}, {}, Partial<IWord>>, res: Response): Promise<void> => {
  try {
    const newWord = await Word.create(req.body);
    res.status(201).json(newWord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteWord: WordController['deleteWord'] = async (req: Request<{ wordId: string }>, res: Response): Promise<void> => {
  try {
    const deletedWord = await Word.findByIdAndDelete(req.params.wordId);
    if (!deletedWord) {
      res.status(404).json({ message: 'Word not found' });
      return;
    }
    res.json({ message: 'Word deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const wordController: WordController = {
  getAllWords,
  getWordById,
  createWord,  
  deleteWord,
};

export default wordController; 