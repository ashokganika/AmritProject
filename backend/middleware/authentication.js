const jwt = require('jsonwebtoken');
const config = require('./../configs/index');
const UserModel=require("./../model/user.model")

module.exports = function (req, res, next) {
    var token;
    if (req.headers['x-access-token']) {
        token = req.headers['x-access-token'];
    }
    if (req.headers['authorization']) {
        token = req.headers['authorization'];
    }
    if (req.headers['token']) {
        token = req.headers['token'];

    }
    if(req.query.token){
        token=req.query.token;
    }
    if (token) {
        jwt.verify(token, config.jwt_secret, function (err, decoded) {
            if (err) {
                return next(err);
            }
            UserModel.findById(decoded._id, function (err, user) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return next({
                        msg: "User removed from system"
                    });
                }
                req.loggedInUser = user;
                next();
            })
        })
    }
    else {
        next({
            msg: 'token not found',
            status: 400
        })
    }
}


