"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = require("../controllers/user.controller");
const DrivingOfferController = require("../controllers/drivingOffer.controller");
const DriviningRequestController = require("../controllers/drivingRequest.controller");
const BookingController = require("../controllers/booking.controller");
const User = require('../models/user.model');
let bcrypt = require('bcrypt');
class Routes {
    routes(app) {
        let userController = new UserController();
        let drivingOfferController = new DrivingOfferController();
        let drivingRequestController = new DriviningRequestController();
        let bookingController = new BookingController();
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
            .get(drivingOfferController.get_drivingOffers)
            .post(drivingOfferController.create_drivingOffer);
        //driving-request routing
        app.route('/api/users/:userId/drivingRequests')
            .get(drivingRequestController.get_drivingRequests)
            .post(drivingRequestController.create_drivingRequest);
        //booking-request routing
        app.route('/api/bookings')
            .post(bookingController.create_booking);
        app.route('/api/bookings/:bookingId')
            .get(bookingController.get_booking_by_id);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=main.route.js.map