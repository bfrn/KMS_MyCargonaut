"use strict";
const DrivingOffer = require('../models/drivingOffer.model');
const User = require('../models/user.model');
class DrivingOfferController {
    get_drivingOffers(req, res, next) {
        DrivingOffer.find({}, (err, drivingOffers) => {
            if (err) {
                return next(err);
            }
            res.send(drivingOffers);
        });
    }
    create_drivingOffer(req, res, next) {
        let drivingOffer = new DrivingOffer({
            date: req.body.date,
            origin: req.body.origin,
            destination: req.body.destination,
            restrictions: req.body.restrictons,
            preferences: req.body.preferences,
            price: req.body.price,
            hasFixedPrice: req.body.hasFixedPrice,
            cargoWeightInKg: req.body.cargoWeightInKg,
            loadingSpaceDimensions: req.body.loadingSpaceDimension,
            personCnt: req.body.personCnt,
            stops: req.body.stops,
            owner: req.params.userId,
        });
        drivingOffer.save((err) => {
            if (err) {
                return next(err);
            }
            User.findOneAndUpdate(req.params.userId, { "$push": { "drivingOffers": drivingOffer._id } }, (err, user) => {
                if (err) {
                    return next(err);
                }
                res.status(200);
                res.send({ success: 'drivingOffer successfully created' });
            });
        });
    }
}
module.exports = DrivingOfferController;
//# sourceMappingURL=drivingOffer.controller.js.map