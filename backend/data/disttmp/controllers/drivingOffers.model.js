const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let driving = new Schema({
    email: { type: String, required: true },
});
// Export the User model
module.exports = mongoose.model('Driving', driving);
//# sourceMappingURL=drivingOffers.model.js.map