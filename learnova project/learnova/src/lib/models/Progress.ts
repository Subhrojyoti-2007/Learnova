import mongoose, { Schema, Document } from 'mongoose';

// ==========================================
// 1. UserProgress Model
// ==========================================
export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  overallMastery: number;
  conceptsMastered: number;
  learningStreakDays: number;
  knowledgeGapsCount: number;
  // History for the 7-day chart
  progressHistory: {
    date: Date;
    mastery: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  overallMastery: { type: Number, default: 0 },
  conceptsMastered: { type: Number, default: 0 },
  learningStreakDays: { type: Number, default: 0 },
  knowledgeGapsCount: { type: Number, default: 0 },
  progressHistory: [{
    date: { type: Date, required: true },
    mastery: { type: Number, required: true }
  }]
}, { timestamps: true });

// ==========================================
// 2. KnowledgeGap Model
// ==========================================
export interface IKnowledgeGap extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  mastery: number;
  status: 'Critical' | 'Weak' | 'Developing' | 'Strong';
  color: 'rose' | 'orange' | 'amber' | 'blue' | 'emerald';
  isRootGap: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const KnowledgeGapSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  mastery: { type: Number, required: true },
  status: { type: String, enum: ['Critical', 'Weak', 'Developing', 'Strong'], required: true },
  color: { type: String, enum: ['rose', 'orange', 'amber', 'blue', 'emerald'], required: true },
  isRootGap: { type: Boolean, default: false }
}, { timestamps: true });

// ==========================================
// 3. LearningTask Model
// ==========================================
export interface ILearningTask extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  durationMin: number;
  type: 'Completed' | 'Priority' | 'Practice' | 'Quiz';
  isCompleted: boolean;
  link?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LearningTaskSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  durationMin: { type: Number, required: true },
  type: { type: String, enum: ['Completed', 'Priority', 'Practice', 'Quiz'], required: true },
  isCompleted: { type: Boolean, default: false },
  link: { type: String },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// ==========================================
// 4. ModuleProgress Model
// ==========================================
export interface IModuleProgress extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  modulesLeft: number;
  estimatedMinutesLeft: number;
  progressPercentage: number;
  themeColor: 'primary' | 'blue' | 'orange' | 'emerald' | 'rose';
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleProgressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  modulesLeft: { type: Number, required: true },
  estimatedMinutesLeft: { type: Number, required: true },
  progressPercentage: { type: Number, required: true },
  themeColor: { type: String, enum: ['primary', 'blue', 'orange', 'emerald', 'rose'], required: true },
  link: { type: String, required: true }
}, { timestamps: true });


// Export Models safely (prevent recompilation in Next.js dev mode)
export const UserProgress = mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);
export const KnowledgeGap = mongoose.models.KnowledgeGap || mongoose.model<IKnowledgeGap>('KnowledgeGap', KnowledgeGapSchema);
export const LearningTask = mongoose.models.LearningTask || mongoose.model<ILearningTask>('LearningTask', LearningTaskSchema);
export const ModuleProgress = mongoose.models.ModuleProgress || mongoose.model<IModuleProgress>('ModuleProgress', ModuleProgressSchema);
