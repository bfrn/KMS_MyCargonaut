"use strict";
/**
 * User Controller
 * defines the functions, which are used when route is /user
 */
const User = require('../models/user.model');
const Cookie = require('../models/cookie.model');
let bcrypt = require('bcrypt');
let sessionId;
class UserController {
    /**
     * login without encryption
     * findOne returns a query(JSON-Document) or null
     * looking for key:value pairs
     */
    /* login(req, res, next) {
 
         User.findOne({'username':req.body.username, 'password':req.body.password},(err, user) =>{
             if (err) {
                 console.log("Error.");
                 return next(err);
             }
             let user_obj = JSON.parse(JSON.stringify(user));
             if(user_obj == null){ // if user_obj IS NULL
                 console.log("No user found.");
                 res.sendStatus(403); //send statuscode 403 and errormessage: forbidden
                 return; // return since we are done here
             }
             console.log("User:\n" + JSON.stringify(user_obj)); // print the user_obj in JSON
             res.send(user_obj); // responde with success
         })
     }*/
    /**
     * findOne returns a query(JSON-Document) or null
     * looking for key:value pairs
     * bcrypt.compare compares the given password with the password in the db
     * the given password is being hashed, the stored password is being restored to its former hash using
     * the original salt (which was stored together with the password in the db)
     * if the passwords match the user is being authenticated correctly
     *
     * returns the user
     */
    login(req, res, next) {
        let password = req.body.password;
        User.findOne({ 'username': req.body.username })
            .then(function (user) {
            //let userId : string = user._id;
            req.session.sessionID = req.session.id;
            req.session.username = req.body.username;
            console.log(req.session.username + ", Session id: " + req.session.sessionID);
            /*res.send(JSON.stringify(
                user
                //req.session.sessionID,
                //req.session.username
            ));*/
            return bcrypt.compare(password, user.password);
        }).then(function (samePassword, user) {
            if (!samePassword) {
                res.status(403).send();
                console.clear();
                console.log("Password didn't match.");
            }
            /*if(req.body.username == "admin") {
                console.log("Admin logged in");
                let response: string = "true";
                res.send(response);
            }*/
            req.session.username = req.body.username;
            req.session.sessionID = req.session.id;
            res.status(200);
            res.send(JSON.stringify(user
            //req.session.sessionID,
            //req.session.username
            ));
            console.log("Login, check: " + req.session.username);
            //res.send(JSON.stringify(req.session.username), );//JSON.stringify(req.cookies['session']));           // return req.session.username;
        }).catch(function (error) {
            console.clear();
            console.log("Error authenticating user: ");
            console.log(error);
            next();
        });
    }
    ;
    checkAdmin(req, res) {
        console.log("Debug: Session Username Checklog=> " + req.session.username);
        if (req.session.username == "admin") {
            console.log("Admin logged in");
            res.send({ success: true });
        }
        else {
            console.log("Admin not logged in");
            res.send({ success: false });
        }
    }
    checklogin(req, res, user) {
        console.log("Debug: SessionID Checklog=> " + req.session.sessionID);
        console.log("Session User Id " + req.session.username);
        if (!req.session.sessionID) {
            res.send({ success: false });
        }
        else {
            res.send({ success: true });
            console.log("Eingeloggt: " + req.session.username);
        }
    }
    /**
     * route without encryption
     */
    /*create_user(req, res, next): void {
       let user = new User({
           username: req.body.username,
           password: req.body.password,
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           //birthdate: req.body.birthdate,
           bio: req.body.bio,
           street: req.body.street,
           houseNumber: req.body.houseNumber,
           zip: req.body.zip,
           city: req.body.city
       });
       user.save((err,user) => {
          if (err) {
             return next(err)
          }
          res.status(200);
          //res.send({success: 'user successfully created'} )
           res.send(user);
       })
    }*/
    /**
     * create_user Function is used to create a new Document in the DB
     * The POST-Request has to contain the key-value pairs
     *    username:value
     *    password:value
     * the password is being encrypted first using bcrypt
     * then the user is being saved in the db with the encrypted password
     */
    create_user(req, res, next) {
        let BCRYPT_SALT_ROUNDS = 12;
        let password = req.body.password;
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
            .then(function (hashedPassword) {
            let user = new User({
                username: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthdate: req.body.birthdate,
                phone: req.body.phone,
                mail: req.body.mail,
                img: req.body.img,
                bio: req.body.bio,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                zip: req.body.zip,
                city: req.body.city,
                pkw: req.body.pkw,
                transporter: req.body.transporter,
                lkw: req.body.lkw,
            });
            return user.save((err, user) => {
                if (err) {
                    return next(err);
                }
                console.clear();
                console.log("User:\n" + JSON.stringify(user));
                res.status(200);
                //res.send({success: 'user successfully created'} )
                res.send(user);
            });
        });
    }
    get_user_by_id(req, res, next) {
        User.findById(req.params.userId, (err, user) => {
            if (err)
                return next(err);
            res.send(user);
        });
    }
    get_user_Profile(req, res) {
        User.findOne({ 'username': req.session.username }, (err, user) => {
            if (err) {
                res.send();
                console.log("No user found");
            }
            res.send(user);
            //console.log("User found" + user);
        });
    }
    get_users(req, res, next) {
        User.find({}, (err, user) => {
            if (err)
                return next(err);
            res.send(user);
        });
    }
    delete_user_by_id(req, res, next) {
        User.findByIdAndDelete(req.params.userId, (err, user) => {
            if (err) {
                return next(err);
            }
            res.send({ success: 'User successfully deleted.' });
        });
    }
    /**
     * update Function is used to update an existing Document in the DB
     * The PUT-Request uses the body of the request to update the existing data
     * Then the password is being hashed and saved correctly
     */
    update_user_by_username(req, res, next) {
        User.findOneAndUpdate({ 'username': req.session.username }, { $set: req.body }, (err, user) => {
            let password = req.body.password;
            console.log("Neues password: " + password);
            let BCRYPT_SALT_ROUNDS = 12;
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
                .then(function (hashedPassword) {
                //console.log(req.session.username);
                User.updateOne({ 'username': req.session.username }, { $set: { 'password': hashedPassword } }, (err, user) => {
                    console.log(hashedPassword);
                    if (err) {
                        console.log("Update failed.");
                        return next(err);
                    }
                    else {
                        console.log("Update worked.");
                        console.log(user);
                        res.send(user);
                    }
                });
            });
        });
    }
    update_user_cars(req, res, next) {
        User.findOneAndUpdate({ 'username': req.session.username }, { $set: req.body }, (err, user) => {
            if (err) {
                console.log("Update failed.");
                return next(err);
            }
            else {
                console.log("Update worked.");
                console.log(user);
                res.send(user);
            }
        });
    }
    setCookie(req, res) {
        console.log(req.cookies);
        // Set cookie var
        req.session.name = "simon";
        req.session.sessionID = req.session.id;
        res.send('cookie set');
    }
    logout(req, res) {
        User.findByIdAndDelete(req.session.id, (err) => {
            if (err) {
                console.log("Logout not possible. " + err);
            }
            else {
                req.session.destroy();
                res.clearCookie();
                res.send({ success: true });
            }
        });
    }
}
module.exports = UserController;
//# sourceMappingURL=user.controller.js.map