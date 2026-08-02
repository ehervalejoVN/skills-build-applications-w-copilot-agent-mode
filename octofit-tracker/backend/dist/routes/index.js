"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthRoutes_1 = __importDefault(require("./healthRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const teamRoutes_1 = __importDefault(require("./teamRoutes"));
const activityRoutes_1 = __importDefault(require("./activityRoutes"));
const workoutRoutes_1 = __importDefault(require("./workoutRoutes"));
const router = (0, express_1.Router)();
router.use('/api', healthRoutes_1.default);
router.use('/api', userRoutes_1.default);
router.use('/api', teamRoutes_1.default);
router.use('/api', activityRoutes_1.default);
router.use('/api', workoutRoutes_1.default);
exports.default = router;
