/*Initialization*/ 
const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user.route')
const mongoose = require('mongoose')
let port = 8080
/*Start Connection with DB*/
/*Very dangerous Hardcoded user:pass -> need alternatives*/
let dev_db_url = 'mongodb://simon:123@nodeDatabase_1/test'
console.log('log:'+ process.env.DBUSERNAME)
console.log('log:'+ process.env.DBPASSWORD)

//let dev_db_url = 'mongodb://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@nodeDatabase_1/test'

let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
/*More Init*/
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/*Routes */
app.get('/', (req,res) => {
   res.send('Hey!')
})
app.use('/user', user)


/*Start Server*/ 
module.exports  = app.listen(port, () => console.log('Server Running on Port '+ port + '\nOpen http://Localhost:'+ port))
