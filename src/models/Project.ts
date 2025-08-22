import mongoose, { Document, Schema } from 'mongoose';
import { ProjectDetailsResponse, Status, StatusValues } from '../types';

export interface IProject extends Document {
    name: string;
    description?: string;
    ownerId: string;
    members: string[];
    status: Status;
    createdAt: Date;
    updatedAt: Date;

    toDto(): ProjectDetailsResponse;
}

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String },
  ownerId: { type: String, required: true },
  members: { type: [String], required: true },
  status: { type: String, enum: Object.values(StatusValues), required: true },
}, { timestamps: true });

projectSchema.methods.toDto = function(): ProjectDetailsResponse {
  return {
    id: this._id.toString(),
    name: this.name,
    description: this.description,
    ownerId: this.ownerId,
    members: this.members,
    status: this.status,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export const Project = mongoose.model<IProject>(
  'Project', 
  projectSchema
);
