"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const main_route_1 = require("./routes/main.route");
const mongoose = require("mongoose");
const cors = require("cors");
class App {
    constructor() {
        this.router = new main_route_1.Routes();
        this.mongoURL = 'mongodb://localhost:27017/test';
        this.app = express();
        this.config();
        this.router.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: false,
        }));
        this.app.use(cors());
        //--- session management -----------------------------------------------------
        this.app.use(session({
            resave: true,
            saveUninitialized: true,
            rolling: true,
            secret: "secret" // encrypt session-id in cookie using "secret"
        }));
        //--- authentication -----------------------------------------------------
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }
    mongoSetup() {
        let mongoDB = process.env.MONGODB_URI || this.mongoURL;
        mongoose.connect(mongoDB, { useNewUrlParser: true });
        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map