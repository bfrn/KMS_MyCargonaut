const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user.route')
const mongoose = require('mongoose')
let dev_db_url = 'mongodb://simon:123@nodeDatabase/test'
let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const app = express()
let port = 8080
/*app.get('/', (req,res) => {
   res.send('Hey!')
})*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/register', user)

app.listen(port, () => console.log('Server Running on Port '+ port + '\nOpen http://Localhost:'+ port))
