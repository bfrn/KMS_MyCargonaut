"use strict";
const DriviningRequest = require('../models/drivingRequest.model');
const User = require('../models/user.model');
class DriviningRequestController {
    get_drivingRequests(req, res, next) {
        DriviningRequest.find({ owner: req.params.userId }, (err, driviningRequests) => {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200);
            res.json(driviningRequests);
        });
    }
    create_drivingRequest(req, res, next) {
        let drivingRequest = new DriviningRequest({
            date: req.body.date,
            origin: req.body.origin,
            destination: req.body.destination,
            restrictions: req.body.restrictions,
            preferences: req.body.preferences,
            price: req.body.price,
            hasFixedPrice: req.body.hasFixedPrice,
            cargoWeightInKg: req.body.cargoWeightInKg,
            loadingSpaceDimensions: req.body.loadingSpaceDimensions,
            personCnt: req.body.personCnt,
            owner: req.params.userId,
        });
        drivingRequest.save((err, drivingRequest) => {
            if (err) {
                return next(err);
            }
            User.findById(req.params.userId, (err, user) => {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                user.drivingRequests.push(drivingRequest._id);
                user.save((err, user) => {
                    if (err) {
                        res.status(500);
                        return next(err);
                    }
                    res.status(200);
                    res.send({ success: 'drivingRequest successfully created' });
                });
            });
        });
    }
}
module.exports = DriviningRequestController;
//# sourceMappingURL=drivingRequest.controller.js.map