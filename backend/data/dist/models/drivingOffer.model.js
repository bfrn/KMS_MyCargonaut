"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Drive = require('./drive.model');
Drive.discriminator('DrivingOffer', new Schema({
    stops: { type: [String], required: true },
    currLocation: { type: String, required: false },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}));
module.exports = mongoose.model('DrivingOffer');
//# sourceMappingURL=drivingOffer.model.js.map