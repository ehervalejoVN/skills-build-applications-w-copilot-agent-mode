"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activityController_1 = require("../controllers/activityController");
const router = (0, express_1.Router)();
router.get('/activities', activityController_1.listActivities);
router.post('/activities', activityController_1.createActivity);
exports.default = router;
