/**
 * User Controller
 * defines the functions, which are used when route is /user
 */
const User = require('../models/user.model')


/**
 * create_user Function is used to create a new Document in the DB
 * The POST-Request has to contain the key-value pairs 
 *    username:value
 *    password:value 
 */
exports.create_user = (req, res, next) => {
   let user = new User({
       username: req.body.username,
       password: req.body.password
   })
   user.save((err) => {
      if (err) {
         return next(err)
      }
      res.send('User Created successfully')
   })
}
exports.get_user_by_id = (req, res, next) => {
   User.findById(req.params.id, function (err, user) {
      if (err) return next(err);
      res.send(user);
  })
}

exports.delete_user_by_id = (req, res, next) => {
   User.findByIdAndDelete(req.params.id, function (err, user) {
      if (err) return next(err);
      res.send('User successfully deleted');
  })
}
exports.update_user_by_id = function (req, res, next) {
   User.findByIdAndUpdate(req.params.id, {$set: req.body},(err, user) => {
       if (err) return next(err)
       res.send('User successfully udpated')
   })
}