const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const address = req.body.address;

    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email : email,
                name : name,
                password : hashedPassword,
                address : address
            });
            return user.save()
        })
        .then(user => {
            let token = jwt.sign({
                userId : user._id,
                name : user.name,
            },'SECRET_KEY', {expiresIn : '5h'});
            res.status(200).json({
                token : token, 
                userId : user._id.toString(),
                name : user.name
            });
        })
        .catch(err => {
            if(err.code == 11000) {
                err.message = 'Sorry, User with that email already exists!';
            }
            next({
                status : 400,
                message : err.message
            });
        });
};

exports.signIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let userLoaded;

    const user = User.findOne({ email : email })
    user
    .then(userFound => {
        if(!userFound) {
            const err = new Error("User does not exist!");
            err.status = 400;
            throw err;
        }
        userLoaded = userFound;
        return bcrypt.compare(password, userFound.password);
    })
    .then(isEqual => {
        if(!isEqual) {
            return next({
                status : 400,
                message : 'invalid Email/Password'
            })
        }
        let token = jwt.sign({
            userId : userLoaded._id,
            name : userLoaded.name,
        },'SECRET_KEY', {expiresIn : '5h'});
        res.status(200).json({
            token : token, 
            userId : userLoaded._id.toString(),
            name : userLoaded.name
        });
    })
    .catch(err => {
        return next({
            status : 400,
            message : 'invalid Email/Password'
        })
    });
}
exports.getUsers = (req, res, next) => {
    User
        .find()
        .then(result => {
            res.status(200).json({
                users : result
            })
        })
        .catch(err => {
            next(err);
        });
}

exports.deleteUser = (req, res, next) => {
    const userId = req.params.id;
    User
        .findById(userId)
        .then(result => {
            if(!result) {
                next({
                    message : 'user not found'
                })
            }
            return User.findByIdAndDelete(result._id)
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