import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
}

export interface IChat extends Document {
  _id: string;
  userId: string;
  exerciseId: string;
  languageId: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
}

export interface IActivity extends Document {
  _id: string;
  exercises: string[];
}

export interface IExercise extends Document {
  _id: string;
  activity: string;
}

export interface ILanguage extends Document {
  _id: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
} 