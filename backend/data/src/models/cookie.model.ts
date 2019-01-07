/**
 * DB schemes
 * used to define the schemes for server and DB communication.
 */

import * as mongoose from 'mongoose'
import { isBoolean } from 'util';
const Schema = mongoose.Schema;

let cookieSchema = new Schema({
   username: {type: String, required: true},
   expires: {type: Date, required: true},
   session: {
       cookie: {
           username: {type: String, required: true},
           expires: {type: String, required: true},
           sessionID: {type: String, required:true}
            //lastAccessDate: {type: String, required: true},

       }
   }

   
   /**
    *   { 
    *    "_id" : "Ro2o1fXehzcOHXY2fYEjM1efaVRjuybn",
    *    "expires" : ISODate("2019-01-21T01:45:28.902Z"),
    *    "session" : "{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"name\":\"simon\"}"
    *   }
    * 
    * 
    */
});

// Export the User model
module.exports = mongoose.model('Cookie', cookieSchema);
