import * as express from 'express'
import * as session from "express-session";
import * as passport from "passport";
import * as bodyParser from 'body-parser'
import { Routes } from './routes/main.route'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
const MongoStore = require('connect-mongo')(session);


class App{
    public app: express.Application;
    public router: Routes = new Routes();
    public mongoURL = 'mongodb://localhost:27017/test';
    private db;
    constructor(){
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.db = this.mongoSetup()
    }

    private config(): void {

        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(cors({origin: [
            "http://localhost:4200"
          ], credentials: true}));
        this.app.use(cookieParser());

        //--- session management -----------------------------------------------------
        this.app.use(session({
            maxAge: 1000 * 60 * 15, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            signed: false, // Indicates if the cookie should be signed
            resave: true,    // save session even if not modified
            saveUninitialized: false,    // save session even if not used
            //rolling: true,    // forces cookie set on every response
            secret: "secret", // encrypt session-id in cookie using "secret"
            store: new MongoStore({ url: this.mongoURL })

        }));

    }
    private mongoSetup(): any{
        let mongoDB = process.env.MONGODB_URI || this.mongoURL;
        mongoose.connect(mongoDB,{ useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'))
        return db;
    }
}
export default new App().app
