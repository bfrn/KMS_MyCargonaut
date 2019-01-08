"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const main_route_1 = require("./routes/main.route");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo')(session);
class App {
    constructor() {
        this.router = new main_route_1.Routes();
        this.mongoURL = 'mongodb://localhost:27017/test';
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.db = this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(cors({ origin: [
                "http://localhost:4200"
            ], credentials: true }));
        this.app.use(cookieParser());
        //--- session management -----------------------------------------------------
        this.app.use(session({
            maxAge: 1000 * 60,
            httpOnly: true,
            signed: false,
            resave: false,
            saveUninitialized: false,
            //rolling: true,    // forces cookie set on every response
            secret: "secret",
            store: new MongoStore({ url: this.mongoURL })
        }));
    }
    mongoSetup() {
        let mongoDB = process.env.MONGODB_URI || this.mongoURL;
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return db;
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map