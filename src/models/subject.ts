import { Schema, model } from 'mongoose';
import { ISubject } from '../types/models';

const SubjectSchema = new Schema<ISubject>({
  en: { type: String, required: true },
  es: { type: String, required: true }
}, { timestamps: true });

const Subject = model<ISubject>('Subject', SubjectSchema);

export default Subject; 