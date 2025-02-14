import { Schema, model } from 'mongoose';
import { IChat, IMessage } from '../types/models';

const messageSchema = new Schema<IMessage>({
  role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  // additional message properties
});

const chatSchema = new Schema<IChat>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  languageId: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
  messages: [messageSchema],
  level: { 
    type: String, 
    required: true,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  },
  tone: { type: Schema.Types.ObjectId, ref: 'Tone', required: true },
  date: { type: Date, default: Date.now },
  context: { type: String },  
});

const Chat = model<IChat>('Chat', chatSchema);

export default Chat; 