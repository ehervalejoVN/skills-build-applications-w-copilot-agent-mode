"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeam = exports.getTeamById = exports.listTeams = void 0;
const models_1 = require("../models");
const listTeams = async (_req, res) => {
    try {
        const teams = await models_1.Team.find().populate('members', 'username fullName level');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch teams', error });
    }
};
exports.listTeams = listTeams;
const getTeamById = async (req, res) => {
    try {
        const team = await models_1.Team.findById(req.params.id).populate('members', 'username fullName level');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return res.json(team);
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to fetch team', error });
    }
};
exports.getTeamById = getTeamById;
const createTeam = async (req, res) => {
    try {
        const team = new models_1.Team(req.body);
        await team.save();
        return res.status(201).json(team);
    }
    catch (error) {
        return res.status(400).json({ message: 'Unable to create team', error });
    }
};
exports.createTeam = createTeam;
