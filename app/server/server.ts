/* express server */
import * as express from 'express';
import { Request, Response } from 'express';

/* body parser to retreive posted data */
import * as bodyParser from "body-parser";

/* https functionality */
import * as fs from "fs";
import * as http from 'http';
import * as https from 'https';

/* firebase */
import * as admin from "firebase-admin";
import * as path from "path";

/*****************************************************************************
 ***  Connect firebase database                                              *
 *****************************************************************************/
let serviceAccount = path.resolve(__dirname, './testapp-91193-firebase-adminsdk-93bko-3d7c7323ae.json');

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
let ref = admin.database().ref();
let userRef = ref.child('user');

/*****************************************************************************
 ***  Create servers with handler function and start it                      *
 *****************************************************************************/
let privateKey = fs.readFileSync('server/sslcert/localhost.key', 'utf8');
let certificate = fs.readFileSync('server/sslcert/localhost.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};
let router = express();

let server = https.createServer(credentials, router).listen(8443);
http.createServer(router).listen(8080);
console.log(`
	-------------------------------------------------------------
	Aufruf: https://localhost:8443
	-------------------------------------------------------------
`);

/*****************************************************************************
 ***  routes                                                                 *
 *****************************************************************************/

let clientPath: string = path.resolve(__dirname + "/../client/");

//--- static routes -----------------------------------------------------------
router.use("/client", express.static(clientPath));
router.use("/jquery", express.static(clientPath + "/node_modules/jquery/dist"));

/*****************************************************************************
 ***  Classes                                                  *
 *****************************************************************************/
export class User {
    firstname: string;
    lastname: string;

    constructor(firstname: string, lastname: string){
        this.firstname = firstname;
        this.lastname = lastname;
    }
}

let users: User[] = [];

router.use(bodyParser.json());

/*****************************************************************************
 ***  user routes                                                            *
 *****************************************************************************/
router.post("/user", function (req: Request, res: Response) {
    let firstname: string = (req.body.firstname ? req.body.firstname : "").trim();
    let lastname: string = (req.body.lastname ? req.body.lastname : "").trim();
    let status: number = 500;
    let message: string = "";

    userRef.push({
        firstName: firstname,
        lastName: lastname,
    }).then((result) => {
            message = "Created: " + firstname + " " + lastname;
            res.status(201);
            res.send(JSON.stringify(result));
            // console.log("server:", result, message);
        },
        (error) => {
            message = "Database error: " + error.code;
            status = 505;
            res.status(status).json({message: message});
        });
});

router.use("/", express.static(__dirname + "/client"));


