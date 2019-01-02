/**
 * User Controller
 * defines the functions, which are used when route is /user
 */
const User = require('../models/user.model');


/**
 * create_user Function is used to create a new Document in the DB
 * The POST-Request has to contain the key-value pairs 
 *    username:value
 *    password:value 
 */
class UserController{
    login(req, res, next): void {
        /**
         * findOne returns a query(JSON-Document) or null  
         * looking for key:value pairs
         */
        User.findOne({'username':req.body.username, 'password':req.body.password},(err, user) =>{
            if (err) {
                return next(err);
            } 
            let user_obj = JSON.parse(JSON.stringify(user))
            if(user_obj == null){ // if user_obj IS NULL
                res.sendStatus(403); //send statuscode 403 and errormessage: forbidden
                return; // return since we are done here
            };
            console.log("User:\n" + JSON.stringify(user_obj)); // print the user_obj in JSON
            res.send({success: 'user successfully loggedin'}) // responde with success
        })
    }

   create_user(req, res, next): void {
      let user = new User({
          username: req.body.username,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          birthdate: req.body.birthdate,
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
   }
   get_user_by_id(req, res, next):void{
      User.findById(req.params.userId,(err, user) =>{
         if (err) return next(err);
         res.send(user);
     })
   }
   get_users(req, res, next):void {
      User.find({},(err, user) =>{
         if (err) return next(err);
         res.send(user);
     })
   }
   
   delete_user_by_id (req, res, next): void {
      User.findByIdAndDelete(req.params.userId, (err, user) =>{
         if (err) return next(err);
         res.send({success: 'user successfully deleted'});
     })
   }
   update_user_by_id(req, res, next):void{
      User.findByIdAndUpdate(req.params.userId, {$set: req.body},(err, user) => {
          if (err) return next(err);
          res.send({success: 'user successfully udpated'})
      })
   }
}
export = UserController 