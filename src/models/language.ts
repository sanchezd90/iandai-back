import { Schema, model } from 'mongoose';
import { ILanguage } from '../types/models';

const LanguageSchema = new Schema<ILanguage>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  label: { 
    en: { type: String, required: true },
    es: { type: String, required: true }
  }  
});

const Language = model<ILanguage>('Language', LanguageSchema);

export default Language; 