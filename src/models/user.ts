import { Schema, model } from 'mongoose';
import { IUser } from '../types/models';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  siteLanguage: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
  conversationLanguage: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
  tone: { type: Schema.Types.ObjectId, ref: 'Tone', required: true },
  level: { 
    type: String, 
    required: true,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  },
  replies: { 
    type: String, 
    required: true,
    enum: ['1', '5', '10']
  },
  showHelp: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const User = model<IUser>('User', UserSchema);

export default User; 