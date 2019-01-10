const DriviningRequest = require('../models/drivingRequest.model');
const User = require('../models/user.model');

class DriviningRequestController {
    get_drivingRequests(req,res,next): void {
        DriviningRequest.find({owner: req.params.userId}, (err, driviningRequests) => {
            if(err) {
                res.status(500);
                return next(err)
            }
            res.status(200);
            res.json(driviningRequests)
        })
    }

    create_drivingRequest(req,res,next): void {
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

        drivingRequest.save().then((drivingRequest) => {
            User.findById(req.params.userId, (err,user)=>{
                if (err){
                    res.status(500);
                    return next(err)
                }
                user.drivingRequests.push(drivingRequest._id);
                user.save().then((user) => {
                    res.status(200);
                    res.send ({success: 'drivingRequest successfully created'})
                },(err)=>{
                    if (err){
                        res.status(500);
                        return next(err)
                    }
                })
            })
        },(err)=>{
            if (err){
                res.status(500);
                return next(err)
            }
        })
    }

    delete_drivingRequest_by_id(req,res,next):void {
        DriviningRequest.findByIdAndDelete(req.params.drivingRequestId,(err,drivingRequest)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            if(drivingRequest.booking != null) {
                res.status(500)
                res.send({failure: 'Cant`t delete Drivingrequest, because it`s still a part of a Booking'})
            }
        }).then(() =>{
            User.findById(req.params.userId,(err, user) =>{
                if (err) return next(err);
                const index = user.drivingRequests.indexOf(req.params.drivingRequestId, 0);
                user.drivingRequests.splice(index, 1);
                user.save((err,user) => {
                    if (err){
                        return next(err)
                    }
                    res.status(200)
                    res.send({success: 'Drivingrequest successfully deleted'})
                })
            })            
        })
    }
}

export = DriviningRequestController