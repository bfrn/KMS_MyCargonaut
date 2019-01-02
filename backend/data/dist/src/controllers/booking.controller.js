"use strict";
const Booking = require('../models/booking.model');
const DrivingOffer = require('../models/drivingOffer.model');
const DriviningRequest = require('../models/drivingRequest.model');
class BookingController {
    create_booking(req, res, next) {
        let booking = new Booking({
            costs: req.body.costs,
            date: req.body.date,
            paymentMethod: req.body.paymentMethod,
            commission: req.body.commission,
            cancelled: req.body.cancelled,
            drivingOffer: req.body.drivingOfferId,
            drivingRequest: req.body.drivingRequestId,
        });
        booking.save((err, booking) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            //update driving-offer
            DrivingOffer.findById(req.params.drivingOfferId, (err, drivingOffer) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                drivingOffer.bookings.push(req.params.drivingOfferId);
                drivingOffer.save((err) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                });
            });
            //update driving-request
            DriviningRequest.findById(req.params.req.params.drivingRequestId, (err, drivingRequest) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                drivingRequest.bookings.push(req.params.drivingRequestId);
                drivingRequest.save((err) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                });
            });
            res.status(200);
            res.send(booking);
        });
    }
    get_booking_by_id(req, res, next) {
        Booking.findById(req.params.bookingId, (err, booking) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200);
            res.send(booking);
        });
    }
}
module.exports = BookingController;
//# sourceMappingURL=booking.controller.js.map