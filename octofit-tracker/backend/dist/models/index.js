"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutSuggestion = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    fullName: { type: String, required: true, trim: true },
    age: { type: Number, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
    points: { type: Number, default: 0 },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team', default: null },
    profileImage: { type: String, default: '' }
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    sport: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    totalPoints: { type: Number, default: 0 },
    coach: { type: String, required: true, trim: true }
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['run', 'walk', 'strength'], required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    caloriesBurned: { type: Number, required: true },
    notes: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });
const workoutSuggestionSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    forLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    description: { type: String, required: true, trim: true }
}, { timestamps: true });
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.WorkoutSuggestion = mongoose_1.default.model('WorkoutSuggestion', workoutSuggestionSchema);
