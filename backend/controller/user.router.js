
const express = require('express');
const router = express.Router();
const UserModel = require('./../model/user.model');
const map_user_req = require('./../helper/map_user_req');

router.get('/', function (req, res, next) {
    var condition = {};
    UserModel
        .find()
        .sort({
            _id: -1
        })
        .exec(function (err, data) {
            if (err) {
                return next(err);
            }
            res.status(200).json(data);
        });
})


router.route('/dashboard')

    .get(function (req, res, next) {

        res.send('from user dashboard')

    })
    .post(function (req, res, next) {
        console.log('here at post', req.body);
        res.send('from user dashboard');

    })
    .delete(function (req, res, next) {

    });
router.route('/:id')
    .get(function (req, res, next) {
        UserModel.findById(req.params.id)
            .exec(function (err, user) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(user);
            })
    })
    .delete(function (req, res, next) {
        UserModel.findById(req.params.id)
            .then(function (user) {
                if (user) {
                    user.remove(function (err, remove) {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json(remove);
                    })
                }
                else {
                    next({
                        msg: "user not found",
                        status: 404
                    })
                }

            })
            .catch(function (err) {
                next(err);
            })
    })
    .put(function (req, res, next) {
        var id = req.params.id;
        var data = req.body;
        UserModel.findById(id, function (err, user) {
            if (err) {
                return next(err);

            }
            if (!user) {
                return next({
                    msg: "user not found",
                    status: 404
                });
            }
            var updatedUser = map_user_req(user, data);
            updatedUser.save(function (err, save) {
                if (err) {
                    return next(err);
                }
                res.status(200).json(save);
            })
        })
    })


module.exports = router;