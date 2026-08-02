"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.WorkoutSuggestion.deleteMany({})
        ]);
        const users = await models_1.User.insertMany([
            {
                username: 'maya',
                email: 'maya@mergington.edu',
                fullName: 'Maya Chen',
                age: 16,
                role: 'student',
                points: 180,
                level: 'advanced'
            },
            {
                username: 'liam',
                email: 'liam@mergington.edu',
                fullName: 'Liam Brooks',
                age: 15,
                role: 'student',
                points: 145,
                level: 'intermediate'
            },
            {
                username: 'sophia',
                email: 'sophia@mergington.edu',
                fullName: 'Sophia Rivera',
                age: 17,
                role: 'student',
                points: 210,
                level: 'advanced'
            },
            {
                username: 'mr_octo',
                email: 'paul@mergington.edu',
                fullName: 'Paul Octo',
                age: 36,
                role: 'teacher',
                points: 0,
                level: 'intermediate'
            }
        ]);
        const teams = await models_1.Team.insertMany([
            {
                name: 'Thunder Flyers',
                sport: 'Cross Country',
                color: 'blue',
                members: [users[0]._id, users[1]._id],
                totalPoints: 325,
                coach: 'Coach Alvarez'
            },
            {
                name: 'Sunset Runners',
                sport: 'Track',
                color: 'orange',
                members: [users[2]._id],
                totalPoints: 210,
                coach: 'Coach Patel'
            }
        ]);
        await models_1.User.updateMany({}, { $set: { team: teams[0]._id } });
        await models_1.User.findByIdAndUpdate(users[2]._id, { team: teams[1]._id });
        await models_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'run',
                durationMinutes: 35,
                distanceKm: 5.2,
                caloriesBurned: 420,
                notes: 'Morning interval run',
                date: new Date('2026-08-01T07:00:00.000Z'),
                pointsEarned: 60
            },
            {
                user: users[1]._id,
                type: 'walk',
                durationMinutes: 45,
                distanceKm: 3.8,
                caloriesBurned: 280,
                notes: 'After-school walk',
                date: new Date('2026-08-01T16:30:00.000Z'),
                pointsEarned: 40
            },
            {
                user: users[2]._id,
                type: 'strength',
                durationMinutes: 50,
                caloriesBurned: 360,
                notes: 'Upper body circuit',
                date: new Date('2026-08-02T18:00:00.000Z'),
                pointsEarned: 55
            }
        ]);
        await models_1.WorkoutSuggestion.insertMany([
            {
                title: 'Quick Cardio Blast',
                focus: 'endurance',
                durationMinutes: 20,
                difficulty: 'easy',
                forLevel: 'beginner',
                description: 'A short routine to build consistency and energy.'
            },
            {
                title: 'Power Circuit',
                focus: 'strength',
                durationMinutes: 30,
                difficulty: 'medium',
                forLevel: 'intermediate',
                description: 'A balanced full-body workout for active students.'
            },
            {
                title: 'Race Prep Session',
                focus: 'speed',
                durationMinutes: 40,
                difficulty: 'hard',
                forLevel: 'advanced',
                description: 'A challenging session to improve pace and stamina.'
            }
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
