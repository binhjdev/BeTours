const { User } = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(404).json({
                status: 'Fail',
                message: 'User not found '
            });
        }
        req.profile = user;
        next();
    });
};

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id

    if (!authorized) {
        return res.status(403).json({
            status: 'Fail',
            message: 'User is not authorized to perform this action'
        });
    }
};

exports.getAllUser = (req,res) => {
    User.find((error, users) => {
        if(error){
            res.status(400).json({
                status: 'Fail',
                message: error
            });
        }
        res.json({
            status: 'Success',
            results: users.length,
            data: {
                users
            }
        });
    });
};

exports.getUser = (req, res) => {
    return res.json({
        status: 'Success',
        user: req.profile 
    });
};