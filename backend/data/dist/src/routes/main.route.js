"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = require("../controllers/user.controller");
const DrivingOfferController = require("../controllers/drivingOffer.controller");
const User = require('../models/user.model');
class Routes {
    routes(app) {
        let userController = new UserController();
        let drivingOfferController = new DrivingOfferController();
        app.route('api/users/login')
            .get(userController.login);
        //user-routing
        app.route('/api/users/register')
            .post(userController.create_user);
        app.route('/api/users')
            .get(userController.get_users);
        app.route('/api/users/:userId')
            .get(userController.get_user_by_id)
            .put(userController.update_user_by_id)
            .delete(userController.delete_user_by_id);
        //driving-offer routing
        app.route('/api/users/:userId/drivingOffers')
            .get(drivingOfferController.get_drivingOffers);
        app.route('/api/users/:userId/drivingOffers/create')
            .post(drivingOfferController.create_drivingOffer);
    }
}
exports.Routes = Routes;
//app.use('/api/users', userRoute.UserRoutes)
//# sourceMappingURL=main.route.js.map