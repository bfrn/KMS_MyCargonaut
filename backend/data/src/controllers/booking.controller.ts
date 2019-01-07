import { userInfo } from "os";

const Booking = require('../models/booking.model');
const DrivingOffer = require('../models/drivingOffer.model');
const DriviningRequest = require('../models/drivingRequest.model');

class BookingController {

    create_booking(req, res, next): void {
        let booking = new Booking({
            costs: req.body.costs,
            date: req.body.date,
            paymentMethod: req.body.paymentMethod,
            commission: '5.00',
            cancelled: false,
            drivingOffer: req.body.drivingOfferId,
            drivingRequest: req.body.drivingRequestId,
        });

        booking.save((err,booking) => {
            if(err) {
                res.status(500);
                return next(err)
            }
            //update driving-offer
            DrivingOffer.findById(req.body.drivingOfferId, (err,drivingOffer) =>{
                if(err) {
                    res.status(500);
                    return next(err)
                }
                drivingOffer.bookings.push(booking._id);
                drivingOffer.save((err) => {
                    if(err){
                        res.status(500);
                        return next(err)
                    }
                    //update driving-request
                    DriviningRequest.findById(req.body.drivingRequestId,(err,drivingRequest) => {
                        if(err) {
                            res.status(500);
                            return next(err)
                        }
                        drivingRequest.bookings.push(booking._id);
                        drivingRequest.save((err) => {
                            if(err){
                                res.status(500);
                                return next(err)
                            }
                            res.status(200);
                            res.send(booking)
                        })
                    })
                })
            })
        })
    }

    get_booking_by_id(req,res, next): void {
        Booking.findById(req.params.bookingId,(err, booking) => {
            if(err){
                res.status(500);
                return next(err)
            }
            res.status(200);
            res.send(booking)
        })
    }
    

}

export = BookingController