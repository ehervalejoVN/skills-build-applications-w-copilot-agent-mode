"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.listActivities = void 0;
const models_1 = require("../models");
const listActivities = async (_req, res) => {
    try {
        const activities = await models_1.Activity.find().sort({ date: -1 }).populate('user', 'username fullName');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch activities', error });
    }
};
exports.listActivities = listActivities;
const createActivity = async (req, res) => {
    try {
        const activity = new models_1.Activity(req.body);
        await activity.save();
        return res.status(201).json(activity);
    }
    catch (error) {
        return res.status(400).json({ message: 'Unable to create activity', error });
    }
};
exports.createActivity = createActivity;
