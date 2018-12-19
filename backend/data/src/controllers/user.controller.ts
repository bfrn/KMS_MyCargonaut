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
   create_user(req, res, next): void {
      let user = new User({
          //email: req.body.email,
          password: req.body.password,
          lastName: req.body.lastName,
          firstName: req.body.firstName,
          //birthdate: req.body.birthdate,
          bio: req.body.bio,
          street: req.body.street,
          houseNumber: req.body.houseNumber,
          zip: req.body.zip,
          city: req.body.city
      });
      user.save((err) => {
         if (err) {
            return next(err)
         }
         res.status(200);
         //res.send({success: 'user successfully created'} )
          res.send(JSON.stringify(user));
      })
   }
   get_user_by_id(req, res, next){
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
   update_user_by_id(req, res, next) {
      User.findByIdAndUpdate(req.params.userId, {$set: req.body},(err, user) => {
          if (err) return next(err);
          res.send({success: 'user successfully udpated'})
      })
   }
}
export = UserController 