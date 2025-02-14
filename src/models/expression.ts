import { Schema, model } from 'mongoose';
import { IExpression } from '../types/models';

const ExpressionSchema = new Schema<IExpression>({
  expression: { type: String, required: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
  dictionary: { type: String }
}, { timestamps: true });

const Expression = model<IExpression>('Expression', ExpressionSchema);

export default Expression; 