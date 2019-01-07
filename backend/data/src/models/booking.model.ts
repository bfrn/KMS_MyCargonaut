import * as mongoose from 'mongoose'
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
   costs: {type: String, required: true},
   date: {type: Date, required: true},
   paymentMethod: {type: String, required: true},
   commission: {type: String, required: true},
   cancelled: {type: Boolean, required: true},
   drivingOffer: { type: Schema.Types.ObjectId, ref: 'DrivingOffer' ,required: false},
   drivingRequest: { type: Schema.Types.ObjectId, ref: 'DrivingRequest' ,required: false},
});

// Export the User model
module.exports = mongoose.model('Booking', bookingSchema);
