/*Initialization*/ 
const express = require('express')
const bodyParser = require('body-parser')
const user = require('./routes/user.route')
const mongoose = require('mongoose')
let port = 8080
/*Start Connection with DB*/
/*Very dangerous Hardcoded user:pass -> need alternatives*/
let dev_db_url = 'mongodb://nodeDatabase/test'

//let dev_db_url = 'mongodb://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@nodeDatabase_1/test'

let mongoDB = process.env.MONGODB_URI || dev_db_url
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
/*More Init*/
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
   res.setHeader('Access-Control-Allow-Headers', 'X-Request-With, content-type')
   res.setHeader('Access-Control-Allow-Credentials', true)
   next()
})

/*Routes */
app.get('/', (req,res) => {
   res.send('Hey!')
})
app.use('/user', user)


/*Start Server*/ 
module.exports  = app.listen(port, () => console.log('Server Running on Port '+ port + '\nOpen http://Localhost:'+ port))
