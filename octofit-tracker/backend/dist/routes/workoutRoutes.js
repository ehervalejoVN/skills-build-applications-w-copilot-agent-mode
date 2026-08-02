"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workoutController_1 = require("../controllers/workoutController");
const router = (0, express_1.Router)();
router.get('/workouts', workoutController_1.listWorkoutSuggestions);
router.post('/workouts', workoutController_1.createWorkoutSuggestion);
exports.default = router;
