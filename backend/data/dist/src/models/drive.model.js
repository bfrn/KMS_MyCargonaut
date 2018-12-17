"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const baseOptions = {
    discriminatorKey: '__type',
};
const drive = mongoose.model('Drive', new Schema({
    date: { type: Date, required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    restrictions: { type: [String], required: true },
    preferences: { type: [String], required: true },
    price: { type: String, required: true },
    hasFixedPrice: { type: Boolean, required: true },
    cargoWeightInKg: { type: Number, required: true },
    loadingSpaceDimensions: { type: [Number], required: true },
    personCnt: { type: Number, required: true },
}, baseOptions));
module.exports = mongoose.model('Drive');
//# sourceMappingURL=drive.model.js.map