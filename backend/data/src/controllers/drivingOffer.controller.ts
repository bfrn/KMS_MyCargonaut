const DrivingOffer = require('../models/drivingOffer.model');
const User = require('../models/user.model');
const Drive = require('../models/drive.model');


class DrivingOfferController {
    get_drivingOffers(req,res,next): void {
        DrivingOffer.find({owner: req.params.userId}, (err,drivingOffers) => {
            if(err){
                console.log("Fahrtangebote konnten nicht gefunden werden");
                res.status(500);
                return next(err)
            }
            console.log("Fahrtangebote konnten gefunden werden" + drivingOffers);
            res.status(200);
            res.json(drivingOffers)
        })
    }

    get_all_drivingOffers(req, res, next): void {
        DrivingOffer.find({},(err, drivingOffer) =>{
            if (err) {
                console.log("Fahrtangebote konnten nicht gefunden werden");
                return next(err);
            } else {
                console.log("Fahrtangebote konnten gefunden werden" + drivingOffer);
                res.send(drivingOffer);
            }
        });
    }

    get_drivingOffers_by_search(req, res, next): void {
        console.log(req.body.start);

        DrivingOffer.find({origin: req.body.start},(err, drivingOffers) =>{
            if (err) {
                console.log("Fahrtangebote konnten nicht gefunden werden");
                return next(err);
            } else {
                console.log("Fahrtangebote konnten gefunden werden" + JSON.stringify(drivingOffers));
                res.send(drivingOffers);
            }
        });
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
                owner: req.session.username,
            });

            drivingOffer.save().then((drivingOffer)=>{
                User.findOne({'username':req.session.username},(err, user)=>{
                    if (err){
                        res.status(500);
                        return next(err)
                    }
                    user.drivingOffers.push(drivingOffer._id);
                    user.save().then((user) =>{
                        console.log("Nutzer " + user + "Fahrt" + drivingOffer);
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
            } else {
                res.status(200);
            }
        })
    }

    delete_drivingOffers (req, res, next): void {
        DrivingOffer.deleteMany({}, (err,drivingOffer) => {
            if(err){
                res.status(500);
                return next(err)
            } else {
                res.status(200);
                res.send({success: 'User successfully deleted.'});
            }
        })
    }



    /*delete_drivingOffer_by_id (req, res, next): void {
        
        DrivingOffer.findByIdAndDelete(req.params.drivingOfferId, (err,drivingOffer) => {
            if(err){
                res.status(500);
                return next(err)
            }
            if(drivingOffer.bookings.length != 0){
                res.status(500);
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
    }*/
}

export = DrivingOfferController