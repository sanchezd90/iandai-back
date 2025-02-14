import { Schema, model } from 'mongoose';
import { IExercise } from '../types/models';

const ExerciseSchema = new Schema<IExercise>({
    name: {
      type: String,
      required: true,
    },
    systemPrompt: {
      type: String,
      required: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity', // Assuming you have an "Activity" model
      required: true,
    },
    label: {
      en: { type: String, required: true },
      es: { type: String, required: true }
    },
    subjects: {
      type: [Schema.Types.ObjectId],
      ref: 'Subject',
      required: true,
    },
  });

const Exercise = model<IExercise>('Exercise', ExerciseSchema);

export default Exercise; 