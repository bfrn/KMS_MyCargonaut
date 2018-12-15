/**
 * DB schemes
 * used to define the schemes for server and DB communication.
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
   username: {type: String, required: true},
   password: {type: String, required: true},
})

// Export the User model
module.exports = mongoose.model('User', userSchema)
