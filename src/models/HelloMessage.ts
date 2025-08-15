import mongoose, { Document, Schema } from 'mongoose';

export interface IHelloMessage extends Document {
  message: string;
  timestamp: Date;
  userId?: string;
}

const HelloMessageSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: false,
  },
});

export const HelloMessage = mongoose.model<IHelloMessage>(
  'HelloMessage',
  HelloMessageSchema
);
