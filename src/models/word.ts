import { Schema, model } from 'mongoose';
import { IWord } from '../types/models';

const WordSchema = new Schema<IWord>({
  word: { type: String, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  definition: { type: String, required: true }
}, { timestamps: true });

const Word = model<IWord>('Word', WordSchema);

export default Word; 