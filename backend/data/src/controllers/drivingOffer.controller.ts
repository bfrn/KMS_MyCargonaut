const DrivingOffer = require('../models/drivingOffer.model');
const User = require('../models/user.model');


class DrivingOfferController {
    get_drivingOffers(req,res,next): void {
        DrivingOffer.find({owner: req.params.userId}, (err,drivingOffers) => {
            if(err){
                res.status(500);
                return next(err)
            }
            res.status(200);
            res.json(drivingOffers)
        })
    }
    
    create_drivingOffer(req,res,next): void {
            let drivingOffer = new DrivingOffer({
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
                stops: req.body.stops,
                owner: req.params.userId,
            });

            drivingOffer.save((err,drivingOffer) => {
                if (err) {
                    res.status(500);
                    return next(err)
                }
    
                User.findById(req.params.userId,(err, user)=>{
                    if (err){
                        res.status(500);
                        return next(err)
                    }
                    user.drivingOffers.push(drivingOffer._id);
                    user.save((err,user)=>{
                        if (err){
                            res.status(500);
                            return next(err)
                        }
                        res.status(200);
                        res.send ({success: 'drivingOffer successfully created'})
                    })
                })
            })
    }
}

export = DrivingOfferController