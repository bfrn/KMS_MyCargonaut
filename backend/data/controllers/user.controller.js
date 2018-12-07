const User = require('../models/user.model')

exports.user_create = (req, res, next) => {
   let user = new User({
       username: req.body.username,
       password: req.body.password
   })
   user.save((err) => {
      if (err) {
         return next(err);
      }
      res.send('Product Created successfully')
   })
}
