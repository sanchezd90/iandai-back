import { Request, Response } from 'express';
import Expression from '../models/expression';
import { IExpression } from '../types/models'; 

interface ExpressionController {
  getAllExpressions: (req: Request, res: Response) => Promise<void>;
  getExpressionById: (req: Request<{ expressionId: string }>, res: Response) => Promise<void>;
  createExpression: (req: Request<{}, {}, Partial<IExpression>>, res: Response) => Promise<void>;
  updateExpression: (req: Request<{ expressionId: string }, {}, Partial<IExpression>>, res: Response) => Promise<void>;
  deleteExpression: (req: Request<{ expressionId: string }>, res: Response) => Promise<void>;
}

const getAllExpressions: ExpressionController['getAllExpressions'] = async (req: Request, res: Response): Promise<void> => {
  try {
    const expressions = await Expression.find();    
    res.json(expressions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getExpressionById: ExpressionController['getExpressionById'] = async (req: Request<{ expressionId: string }>, res: Response): Promise<void> => {
  try {
    const expression = await Expression.findById(req.params.expressionId);
    if (!expression) {
      res.status(404).json({ message: 'Expression not found' });
      return;
    }
    res.json(expression);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createExpression: ExpressionController['createExpression'] = async (req: Request<{}, {}, Partial<IExpression>>, res: Response): Promise<void> => {
  try {
    const newExpression = await Expression.create(req.body);
    res.status(201).json(newExpression);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateExpression: ExpressionController['updateExpression'] = async (req: Request<{ expressionId: string }, {}, Partial<IExpression>>, res: Response): Promise<void> => {
  try {
    const updatedExpression = await Expression.findByIdAndUpdate(req.params.expressionId, req.body, { new: true });
    if (!updatedExpression) {
      res.status(404).json({ message: 'Expression not found' });
      return;
    }
    res.json(updatedExpression);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteExpression: ExpressionController['deleteExpression'] = async (req: Request<{ expressionId: string }>, res: Response): Promise<void> => {
  try {
    const deletedExpression = await Expression.findByIdAndDelete(req.params.expressionId);
    if (!deletedExpression) {
      res.status(404).json({ message: 'Expression not found' });
      return;
    }
    res.json({ message: 'Expression deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const expressionController: ExpressionController = {
  getAllExpressions,
  getExpressionById,
  createExpression,
  updateExpression,
  deleteExpression,
};

export default expressionController; 