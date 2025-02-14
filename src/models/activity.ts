import { Schema, model } from 'mongoose';
import { IActivity } from '../types/models';

const ActivitySchema = new Schema<IActivity>({
    instructions: {
      type: String,
      required: true,
    },
    responseTemplate: {
      type: String,
      required: true,
    },
    exercises: [{
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
    }],
    name: {
      type: String,
      required: true,
    },
    requires_user_input: {
      type: Boolean,
      required: true,
    },
    tools: {
      help: { type: String },
      words: { type: String }
    },
    instruction:{ 
      en: { type: String, required: true },
      es: { type: String, required: true }
    },
    label: {
      en: { type: String, required: true },
      es: { type: String, required: true }
    }
  });

const Activity = model<IActivity>('Activity', ActivitySchema);

export default Activity; 