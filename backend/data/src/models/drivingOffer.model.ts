import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;
const Drive = require('./drive.model');
const User = require('../models/user.model')

Drive.discriminator('DrivingOffer',new Schema ({
    stops: {type: [String], required: true},
    currLocation: {type: String, required: false},
}))

module.exports = mongoose.model('DrivingOffer')