"use strict";
/**
 * DB schemes
 * used to define the schemes for server and DB communication.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthdate: { type: Date, required: true },
    cellPhoneNumber: { type: Number, required: false },
    img: { type: String, required: true },
    bio: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    zip: { type: Number, required: true },
    city: { type: String, required: true },
    pkw: { type: String, required: true },
    transporter: { type: String, required: true },
    lkw: { type: String, required: true },
    drivingOffers: { type: [{ type: Schema.Types.ObjectId, ref: 'DrivingOffer' }], required: false },
    drivingRequests: { type: [{ type: Schema.Types.ObjectId, ref: 'DrivingRequest' }], required: false },
});
// Export the User model
module.exports = mongoose.model('User', userSchema);
//# sourceMappingURL=user.model.js.map