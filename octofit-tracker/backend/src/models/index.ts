import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  age: number;
  role: 'student' | 'teacher' | 'admin';
  points: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  team?: Types.ObjectId | null;
  profileImage?: string;
}

export interface ITeam extends Document {
  name: string;
  sport: string;
  color: string;
  members: Types.ObjectId[];
  totalPoints: number;
  coach: string;
}

export interface IActivity extends Document {
  user: Types.ObjectId;
  type: 'run' | 'walk' | 'strength';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  notes: string;
  date: Date;
  pointsEarned: number;
}

export interface IWorkoutSuggestion extends Document {
  title: string;
  focus: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  forLevel: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  fullName: { type: String, required: true, trim: true },
  age: { type: Number, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  points: { type: Number, default: 0 },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
  profileImage: { type: String, default: '' }
}, { timestamps: true });

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true, trim: true },
  sport: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
  coach: { type: String, required: true, trim: true }
}, { timestamps: true });

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['run', 'walk', 'strength'], required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, required: true },
  notes: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

const workoutSuggestionSchema = new Schema<IWorkoutSuggestion>({
  title: { type: String, required: true, trim: true },
  focus: { type: String, required: true, trim: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  forLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  description: { type: String, required: true, trim: true }
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const WorkoutSuggestion = mongoose.model<IWorkoutSuggestion>('WorkoutSuggestion', workoutSuggestionSchema);
