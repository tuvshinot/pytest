const Company = require('../models/company');
const mongoose = require('mongoose')

exports.postCompany = (req,res,next) => {
    const name = req.body.name;
    const address = req.body.address;
    const status = req.body.status;
    
    const company = new Company({
        name : name,
        address:address,
        status : status
    })

    company
        .save()
        .then(company => {
            console.log('Post request')
            res.status(201).json({
                message : "company added successfully",
                company : company
            });
        })
        .catch(err => {
            err.message = 'company not created!';
            next(err);
        })
};

exports.getCompanies = (req, res, next) => {
    Company
        .find()
        .then(result => {
            res.status(200).json({
                companies : result
            })
        })
        .catch(err => {
            next(err);
        })
};

exports.deleteCompany = (req, res, next) => {
    const comId = req.params.id;
    Company
        .findById(comId)
        .then(result => {
            if(!result) {
                next({
                    message : 'not found'
                })
            }
            return Company.findByIdAndDelete(result._id)
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
      
}

exports.getCompany = (req, res, next) => {
    const companyId = req.params.id;
    Company
        .findById(companyId)
        .then(result => {
            if(result !== null) {
                return res.status(200).json({
                    result : result
                })
            }
            next({
                error: "Not found company"
            })
        })
        .catch(err => {
            next(err);
        })
}
