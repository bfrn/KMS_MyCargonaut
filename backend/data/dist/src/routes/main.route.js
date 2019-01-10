"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController = require("../controllers/user.controller");
const DrivingOfferController = require("../controllers/drivingOffer.controller");
const DriviningRequestController = require("../controllers/drivingRequest.controller");
const BookingController = require("../controllers/booking.controller");
const User = require('../models/user.model');
class Routes {
    routes(app) {
        let userController = new UserController();
        let drivingOfferController = new DrivingOfferController();
        let drivingRequestController = new DriviningRequestController();
        let bookingController = new BookingController();
        //user-routing
        app.route('/api/users')
            .get(userController.get_users);
        app.route('/api/users/checklogin')
            .get(userController.checklogin);
        app.route('/api/users/checkadmin')
            .get(userController.checkAdmin);
        app.route('/api/users/login')
            .post(userController.login);
        app.route('/api/users/register')
            .post(userController.create_user);
        app.route('/api/users/profile')
            .get(userController.get_user_Profile);
        app.route('/api/users/:userId')
            .get(userController.get_user_by_id)
            //.put(userController.update_user_by_id)
            .delete(userController.delete_user_by_id);
        app.route('/api/users/username')
            .put(userController.update_user_by_username);
        //driving-offer routing
        app.route('/api/users/:userId/drivingOffers')
            .get(drivingOfferController.get_drivingOffers);
        // IN USAGE
        app.route('/api/users/drivingRequests/all')
            .get(drivingOfferController.get_all_drivingOffers);
        app.route('/api/users/drivingRequests/search')
            .post(drivingOfferController.get_drivingOffers_by_search);
        app.route('/api/users/drivingOffers')
            .post(drivingOfferController.create_drivingOffer);
        /* app.route('/api/users/:userId/drivingOffers/:drivingOfferId')
       .delete(drivingOfferController.delete_drivingOffer_by_id);*/
        app.route('/api/users/drivingOffers/:drivingOfferId')
            .delete(drivingOfferController.delete_drivingOffer_by_id);
        app.route('/api/users/all/drivingOffers/delete')
            .delete(drivingOfferController.delete_drivingOffers);
        //driving-request routing
        app.route('/api/users/:userId/drivingRequests')
            .get(drivingRequestController.get_drivingRequests)
            .post(drivingRequestController.create_drivingRequest);
        app.route('/api/users/:userId/drivingRequests/:drivingRequestId')
            .delete(drivingRequestController.delete_drivingRequest_by_id);
        //booking-request routing
        app.route('/api/bookings')
            .post(bookingController.create_booking);
        app.route('/api/bookings/:bookingId')
            .get(bookingController.get_booking_by_id);
        app.route('/api/setcookie')
            .get(userController.setCookie);
        app.route('/api/users/logout')
            .get(userController.logout);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=main.route.js.map