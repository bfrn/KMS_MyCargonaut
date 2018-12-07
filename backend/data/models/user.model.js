const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
})

// Export the model
module.exports = mongoose.model('User', userSchema)
