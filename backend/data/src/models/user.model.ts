/**
 * DB schemes
 * used to define the schemes for server and DB communication.
 */

import * as mongoose from 'mongoose'
import { isBoolean } from 'util';
const Schema = mongoose.Schema;

let userSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
   firstName: {type: String, required: true},
   lastName: {type: String, required: true},
   birthdate: {type: Date, required: true},
   phone: {type: Number, required: true},
   mail: {type: String, required: true},
   img: {type: String, required: true},
   bio: {type:String,required: true},           
   street: {type: String, required: true},      //Straße
   houseNumber: {type: String, required: true}, //Hausnummer
   zip: {type: Number, required: true},         //PLZ
   city: {type: String, required: true},       //Ort
   pkw: {type: String, required: true},
   transporter:  {type: String, required: true},
   lkw:  {type: String, required: true},
   drivingOffers: {type:[{ type: Schema.Types.ObjectId, ref: 'DrivingOffer' }],required: false },
   drivingRequests: {type:[{ type: Schema.Types.ObjectId, ref: 'DrivingRequest' }],required: false},
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
