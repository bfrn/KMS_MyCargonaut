import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;
const Drive = require('./drive.model');
const User = require('../models/user.model');

Drive.discriminator('DrivingRequest',new Schema ({
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' ,required: false},
}));

module.exports = mongoose.model('DrivingRequest');