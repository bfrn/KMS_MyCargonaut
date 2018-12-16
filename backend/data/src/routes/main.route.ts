import { Request, Response } from 'express'
import { NextFunction } from 'connect';
import UserController  = require('../controllers/user.controller')

export class Routes {
    public routes(app): void {
        let userController: UserController = new UserController()
       
        //main route
        app.route('/')
        .get( (req: Request, res: Response)=>{
          res.status(200).send({
            message: `/GET request successfull`
          })
        })
        
        //user-routing
        app.route('/api/users/register')
          .post(userController.create_user)

        app.route('/api/users')
          .get(userController.get_users)

        app.route('/api/users/:userId')
          .get(userController.get_user_by_id)
          .put(userController.update_user_by_id)
          .delete(userController.delete_user_by_id)
        
        //driving-offer routing
        app.route('/api/users/:userId/drivingOffers')
        app.route('/api/users/:userId/drivingOffers/:drivingOfferId')
        
    }   
}
//app.use('/api/users', userRoute.UserRoutes)
