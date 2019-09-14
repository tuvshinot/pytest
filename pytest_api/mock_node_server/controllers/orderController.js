const Order = require('../models/order');

exports.postOrder = (req, res, next) => {

    const customer = req.body.customer;
    const service = req.body.service;
    const status=req.body.status;
    const plainDay = req.body.plainDay;
    const quantityBy=req.body.quantityBy;
    
    const order = new Order({
        customer: customer,
        service: service,
        status: status,
        plainDay:plainDay,
        quantityBy:quantityBy
    })

    order
        .save()
        .then(order => {
            res.status(201).json({
                message : "order added successfully",
                order : order
            });
        })
        .catch(err => {
            if(!err.status) {
                err.status = 400;
            }
            next(err);
        })
}


exports.getOrders = (req, res, next) => {
    Order
        .find()
        .populate('service')
        .populate('customer')
        .then(result => {
            res.status(200).json({
                orders : result
            })
        })
        .catch(err => {
            next(err);
        })
};

exports.deleteOrder = (req, res, next) => {
    const orderId = req.params.id;
    Order
        .findById(orderId)
        .then(result => {
            if(!result) {
                next({
                    message : 'not found'
                })
            }
            return Order.findByIdAndDelete(result._id)
        })
        .then(result => {
            return res.status(204).json({
                message : 'Deleted!',
                result : result
            })
        })
        .catch(err => {
            next(err);
        })
};

exports.getOrder = (req, res, next) => {
    const orderId = req.params.id;

    Order
        .findById(orderId)
        .then(order => {
            res.status(202).json({
                order : order
            })
        })
        .catch(err => {
            next(err);
        })
}

exports.updateOrder = (req, res, next) => {
    const orderId = req.params.id;

    const customer = req.body.customer;
    const service = req.body.service;
    const status=req.body.status;
    const plainDay = req.body.plainDay;
    const quantityBy=req.body.quantityBy;

    Order
        .findById(orderId)
        .then(order => {
            order.customer = customer;
            order.service = service;
            order.status = status;
            order.plainDay = plainDay;
            order.quantityBy = quantityBy;
            return order.save()
        })
        .then(newOrder => {
            res.status(205).json({
                newOrder : newOrder
            })
        })
        .catch(err => {
            next(err)
        })
}