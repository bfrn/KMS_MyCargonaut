import * as express from 'express'
import * as session from "express-session";
import * as passport from "passport";
import * as bodyParser from 'body-parser'
import { Routes } from './routes/main.route'
import * as mongoose from 'mongoose'
import * as cors from 'cors'

class App{
    public app: express.Application;
    public router: Routes = new Routes();
    public mongoURL = 'mongodb://localhost:27017/test';
    constructor(){
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.mongoSetup()
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(cors());

        //--- session management -----------------------------------------------------
        this.app.use(session({
            resave: true,    // save session even if not modified
            saveUninitialized: true,    // save session even if not used
            rolling: true,    // forces cookie set on every response
            secret: "secret" // encrypt session-id in cookie using "secret"
        }));
        //--- authentication -----------------------------------------------------
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    private mongoSetup(): void{
        let mongoDB = process.env.MONGODB_URI || this.mongoURL;
        mongoose.connect(mongoDB,{ useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))
    }
}
export default new App().app
