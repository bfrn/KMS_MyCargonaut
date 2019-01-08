
import UserController  = require('../controllers/user.controller')
import DrivingOfferController  = require('../controllers/drivingOffer.controller')
import DriviningRequestController  = require('../controllers/drivingRequest.controller')
import BookingController = require('../controllers/booking.controller')

const User = require('../models/user.model');

export class Routes {
  public routes(app): void {
    let userController: UserController = new UserController();
    let drivingOfferController: DrivingOfferController = new DrivingOfferController();
    let drivingRequestController: DriviningRequestController = new DriviningRequestController();
    let bookingController: BookingController = new BookingController();

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

    app.route('/api/setcookie')
      .get(userController.setCookie)
  }
}