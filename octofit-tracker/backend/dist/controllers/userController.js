"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUserById = exports.listUsers = void 0;
const models_1 = require("../models");
const listUsers = async (_req, res) => {
    try {
        const users = await models_1.User.find().populate('team', 'name sport color');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Unable to fetch users', error });
    }
};
exports.listUsers = listUsers;
const getUserById = async (req, res) => {
    try {
        const user = await models_1.User.findById(req.params.id).populate('team', 'name sport color');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to fetch user', error });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const user = new models_1.User(req.body);
        await user.save();
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ message: 'Unable to create user', error });
    }
};
exports.createUser = createUser;
