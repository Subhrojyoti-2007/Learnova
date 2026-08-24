import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string; // Optional if using OAuth later
  institution?: string;
  gradeLevel?: string;
  fieldOfStudy?: string;
  learningGoals?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      select: false,
    },
    institution: {
      type: String,
      default: '',
    },
    gradeLevel: {
      type: String,
      default: '',
    },
    fieldOfStudy: {
      type: String,
      default: '',
    },
    learningGoals: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of the model in development mode
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
