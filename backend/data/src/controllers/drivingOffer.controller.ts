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

            drivingOffer.save().then((drivingOffer)=>{
                User.findById(req.params.userId,(err, user)=>{
                    if (err){
                        res.status(500);
                        return next(err)
                    }
                    user.drivingOffers.push(drivingOffer._id);
                    user.save().then((user) =>{
                        res.status(200);
                        res.send ({success: 'drivingOffer successfully created'})
                    },(err)=>{
                        if (err){
                            res.status(500);
                            return next(err)
                        }
                    })
                }) 
            },(err) => {
                if (err){
                    res.status(500);
                    return next(err)
                } 
            })
               
    
    }

    delete_drivingOffer_by_id (req, res, next): void {
        
        DrivingOffer.findByIdAndDelete(req.params.drivingOfferId, (err,drivingOffer) => {
            if(err){
                res.status(500);
                return next(err)
            }
            if(drivingOffer.bookings.length != 0){
                res.status(500)
                res.send({failure: 'Cant`t delete Drivingoffer, because its still a part of a Booking'})
            } 
        }).then(()=>{
            User.findById(req.params.userId,(err, user) =>{
                if (err) return next(err);
                const index = user.drivingOffers.indexOf(req.params.drivingOfferId, 0);
                user.drivingOffers.splice(index, 1);
                user.save((err,user) => {
                    if (err){
                        return next(err)
                    }
                    res.status(200)
                    res.send({success: 'Drivingoffer successfully deleted'})
                })
            })
        })
    }
}

export = DrivingOfferController