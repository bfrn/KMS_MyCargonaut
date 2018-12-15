import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Routes } from './routes/main.route'
import * as mongoose from 'mongoose'

class App{
    public app: express.Application
    public router: Routes = new Routes()
    public mongoURL = 'mongodb://localhost:27017/test'
    constructor(){
        this.app = express()
        this.config()
        this.router.routes(this.app)
        this.mongoSetup()
    }

    private config(): void {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }))
    }
    private mongoSetup(): void{
        let mongoDB = process.env.MONGODB_URI || this.mongoURL
        mongoose.connect(mongoDB)
        mongoose.Promise = global.Promise
        let db = mongoose.connection
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    }
}
export default new App().app
