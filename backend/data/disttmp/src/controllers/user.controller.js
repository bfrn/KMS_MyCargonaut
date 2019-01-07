"use strict";
/**
 * User Controller
 * defines the functions, which are used when route is /user
 */
const User = require('../models/user.model');
let bcrypt = require('bcrypt');
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
     */
    login(req, res, next) {
        let password = req.body.password;
        console.log("Hier\n");
        User.findOne({ 'username': req.body.username })
            .then(function (user) {
            return bcrypt.compare(password, user.password);
        }).then(function (samePassword) {
            if (!samePassword) {
                res.status(403).send();
                console.clear();
                console.log("Password didn't match.");
            }
            //let user_obj = JSON.parse(JSON.stringify(user));
            console.clear();
            console.log("Eingeloggt.");
            res.status(200).send();
        }).catch(function (error) {
            console.clear();
            console.log("Error authenticating user: ");
            console.log(error);
            next();
        });
    }
    ;
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
                //birthdate: req.body.birthdate,
                bio: req.body.bio,
                street: req.body.street,
                houseNumber: req.body.houseNumber,
                zip: req.body.zip,
                city: req.body.city
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
    get_users(req, res, next) {
        User.find({}, (err, user) => {
            if (err)
                return next(err);
            res.send(user);
        });
    }
    delete_user_by_id(req, res, next) {
        User.findByIdAndDelete(req.params.userId, (err, user) => {
            if (err)
                return next(err);
            res.send({ success: 'user successfully deleted' });
        });
    }
    update_user_by_id(req, res, next) {
        User.findByIdAndUpdate(req.params.userId, { $set: req.body }, (err, user) => {
            if (err)
                return next(err);
            res.send({ success: 'user successfully udpated' });
        });
    }
}
module.exports = UserController;
//# sourceMappingURL=user.controller.js.map