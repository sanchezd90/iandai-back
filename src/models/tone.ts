import { Schema, model } from 'mongoose';
import { ITone } from '../types/models';

const ToneSchema = new Schema<ITone>({
  en: { type: String, required: true },
  es: { type: String, required: true }
}, { timestamps: true });

const Tone = model<ITone>('Tone', ToneSchema);

export default Tone; 