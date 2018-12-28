
import UserController  = require('../controllers/user.controller')
import DrivingOfferController  = require('../controllers/drivingOffer.controller')


const User = require('../models/user.model');

export class Routes {
    public routes(app): void {
        let userController: UserController = new UserController();
        let drivingOfferController: DrivingOfferController = new DrivingOfferController();

        
        //user-routing
        
        app.route('/api/users')
          .get(userController.get_users);
        app.route('/api/users/login')
          .post(userController.login);
        app.route('/api/users/register')
          .post(userController.create_user);
      
        app.route('/api/users/:userId')
          .get(userController.get_user_by_id)
          .put(userController.update_user_by_id)
          .delete(userController.delete_user_by_id);
        
        //driving-offer routing
        app.route('/api/users/:userId/drivingOffers')
          .get(drivingOfferController.get_drivingOffers);
          
        app.route('/api/users/:userId/drivingOffers/create')
          .post(drivingOfferController.create_drivingOffer)
        
    }   
}
//app.use('/api/users', userRoute.UserRoutes)
