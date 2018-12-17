"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Drive = require('./drive.model');
const User = require('../models/user.model');
Drive.discriminator('DrivingOffer', new Schema({
    stops: { type: [String], required: true },
    currLocation: { type: String, required: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: false },
}));
module.exports = mongoose.model('DrivingOffer');
//# sourceMappingURL=drivingOffer.model.js.map