"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************************************************************
 ***  Import some modules from node.js (see: expressjs.com/en/4x/api.html)   *
 *****************************************************************************/
/* express server */
var express = require("express");
/* firebase */
//import firebase from "firebase";
//import * as admin from "firebase-admin";
var router = express();
// router.listen(8080);
console.log("\n\t-------------------------------------------------------------\n\tAufruf : https://localhost:8443\n\t-------------------------------------------------------------\n");
router.use("/", express.static(__dirname + "/client"));
//# sourceMappingURL=server.js.map