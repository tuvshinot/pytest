const Service = require('../models/service');

exports.postService = (req,res,next) => {
    const serviceName = req.body.serviceName;
    const price = req.body.price;
    const company = req.body.company;
    
    const service = new Service({
        serviceName : serviceName,
        price:price,
        company : company
    })
    service
        .save()
        .then(service => {
            res.status(201).json({
                message : "service added successfully",
                service : service
            });
        })
        .catch(err => {
            err.message = 'service not created!';
            next(err);
        })
};

exports.getServicies = (req, res, next) => {
    Service
        .find()
        .then(result => {
            res.status(200).json({
                servicies : result
            })
        })
        .catch(err => {
            next(err);
        })
};