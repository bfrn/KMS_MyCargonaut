import { Request, Response } from 'express'
import { NextFunction } from 'connect';
import UserController  = require('../controllers/user.controller')

export class Routes {
    public routes(app): void{
        let userController: UserController = new UserController()
        app.route('/')
        .get( (req: Request, res: Response)=>{
            res.status(200).send({
                message: `/GET request successfull`
            })
        })
        app.route('/api/users/register')
            .post(userController.create_user)
        //app.use('/api/users', userRoute.UserRoutes)
    }   
}