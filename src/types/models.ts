import { Document, Types } from 'mongoose';

export interface IActivity extends Document {
  instructions: string;
  responseTemplate: string;
  exercises: Types.ObjectId[] | IExercise[];
  name: string;
  requires_user_input: boolean;
  tools: {
    help?: string;
    words?: string;
  };
  instruction: {
    en: string;
    es: string;
  };
  label: {
    en: string;
    es: string;
  };
}

export interface IExercise extends Document {
  name: string;
  systemPrompt: string;
  activity: Types.ObjectId | IActivity;
  label: {
    en: string;
    es: string;
  };
  subjects: Types.ObjectId[] | ISubject[];
}

export interface ILanguage extends Document {
  name: string;
  code: string;
  label: {
    en: string;
    es: string;
  };
}

export interface ISubject extends Document {
  en: string;
  es: string;
}

export interface ITone extends Document {
  en: string;
  es: string;
}

export interface IUser extends Document {
  email: string;
  password: string;
  googleId: string;
  siteLanguage: Types.ObjectId | ILanguage;
  conversationLanguage: Types.ObjectId | ILanguage;
  tone: Types.ObjectId | ITone;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  replies: '1' | '5' | '10';
  showHelp: boolean;
}

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface IChat extends Document {
  userId: Types.ObjectId | IUser;
  exerciseId: Types.ObjectId | IExercise;
  languageId: Types.ObjectId | ILanguage;
  messages: IMessage[];
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  tone: Types.ObjectId | ITone;
  date: Date;
  context?: string;
}

export interface IWord extends Document {
  word: string;
  chat: Types.ObjectId | IChat;
  definition: string;
}

export interface IExpression extends Document {
  expression: string;
  chat: Types.ObjectId | IChat;
  dictionary?: string;
} 