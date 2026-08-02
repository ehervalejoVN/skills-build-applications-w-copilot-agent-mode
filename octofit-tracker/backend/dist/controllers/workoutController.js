"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkoutSuggestion = exports.listWorkoutSuggestions = void 0;
const models_1 = require("../models");
const listWorkoutSuggestions = async (_req, res) => {
    try {
        const suggestions = await models_1.WorkoutSuggestion.find().sort({ createdAt: -1 });
        res.json(suggestions);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch workout suggestions', error });
    }
};
exports.listWorkoutSuggestions = listWorkoutSuggestions;
const createWorkoutSuggestion = async (req, res) => {
    try {
        const suggestion = new models_1.WorkoutSuggestion(req.body);
        await suggestion.save();
        return res.status(201).json(suggestion);
    }
    catch (error) {
        return res.status(400).json({ message: 'Unable to create workout suggestion', error });
    }
};
exports.createWorkoutSuggestion = createWorkoutSuggestion;
