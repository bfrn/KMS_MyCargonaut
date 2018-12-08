"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* express server */
var express = require("express");
/* body parser to retreive posted data */
var bodyParser = require("body-parser");
/* https functionality */
var fs = require("fs");
var http = require("http");
var https = require("https");
/* firebase */
var admin = require("firebase-admin");
var path = require("path");
/*****************************************************************************
 ***  Connect firebase database                                              *
 *****************************************************************************/
var serviceAccount = path.resolve(__dirname, './testapp-91193-firebase-adminsdk-93bko-3d7c7323ae.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testapp-91193.firebaseio.com"
});
/*let config = {
    apiKey: "AIzaSyBVOa-RR9aUcTUBputN7IUR_QqdfSr-JG4",
    authDomain: "testapp-91193.firebaseapp.com",
    databaseURL: "https://testapp-91193.firebaseio.com",
    projectId: "testapp-91193",
    storageBucket: "",
    messagingSenderId: "33388368200"
};
admin.initializeApp(config);*/
/*****************************************************************************
 ***  database nodes                                                         *
 *****************************************************************************/
var ref = admin.database().ref();
var userRef = ref.child('user');
/*****************************************************************************
 ***  Create servers with handler function and start it                      *
 *****************************************************************************/
var privateKey = fs.readFileSync('server/sslcert/localhost.key', 'utf8');
var certificate = fs.readFileSync('server/sslcert/localhost.crt', 'utf8');
var credentials = { key: privateKey, cert: certificate };
var router = express();
var server = https.createServer(credentials, router).listen(8443);
http.createServer(router).listen(8080);
console.log("\n\t-------------------------------------------------------------\n\tAufruf: https://localhost:8443\n\t-------------------------------------------------------------\n");
/*****************************************************************************
 ***  routes                                                                 *
 *****************************************************************************/
var clientPath = path.resolve(__dirname + "/../client/");
//--- static routes -----------------------------------------------------------
router.use("/client", express.static(clientPath));
router.use("/jquery", express.static(clientPath + "/node_modules/jquery/dist"));
/*****************************************************************************
 ***  Classes                                                  *
 *****************************************************************************/
var User = /** @class */ (function () {
    function User(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    }
    return User;
}());
exports.User = User;
var users = [];
router.use(bodyParser.json());
/*****************************************************************************
 ***  user routes                                                            *
 *****************************************************************************/
router.post("/user", function (req, res) {
    var firstname = (req.body.firstname ? req.body.firstname : "").trim();
    var lastname = (req.body.lastname ? req.body.lastname : "").trim();
    var status = 500;
    var message = "";
    userRef.push({
        firstName: firstname,
        lastName: lastname,
    }).then(function (result) {
        message = "Created: " + firstname + " " + lastname;
        res.status(201);
        res.send(JSON.stringify(result));
        // console.log("server:", result, message);
    }, function (error) {
        message = "Database error: " + error.code;
        status = 505;
        res.status(status).json({ message: message });
    });
});
router.use("/", express.static(__dirname + "/client"));
//# sourceMappingURL=server.js.map