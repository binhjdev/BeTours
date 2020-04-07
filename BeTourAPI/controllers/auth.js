const jwt = require('jsonwebtoken');
const { User, validate } = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const _ = require('lodash');
// define validation lib
const Joi = require('joi');
// define crypt password lib
const bcrypt = require('bcrypt');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = catchAsync(async (req, res, next) => {
    // validate the request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'Fail',
            message: error.details[0].message
        });
    }

    // check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Email is exists'
        });
    } else {
        // insert the new user if they do not exist yet.
        user = new User(_.pick(req.body, ['name', 'email', 'password', 'passwordConfirm']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // save to db
        await user.save();

        const token = signToken(user._id);

        res.status(201).json({
            status: 'Success',
            token,
            data: {
                // return data necessary
                user: _.pick(user, ['_id', 'name', 'email'])
            }
        });
    }
});

exports.login = catchAsync(async (req, res, next) => {
    // validate the request
    const { error } = validateLogin(req.body);
    if (error) {
        return res.status(400).json({
            status: 'Fail',
            message: error.details[0].message
        });
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email or password'
        });
    }

    // compare between passwords
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            status: 'Fail',
            message: 'Incorrect email or password'
        });
    }

    // If everything is ok , send token to client 
    const token = signToken(user._id);
    res.status(200).json({
        status: 'Success',
        token
    });
});

exports.logout = (req, res) => {
    res.cookie('token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'Success' });
};

exports.getMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: 'Fail',
            message: 'No user found with that ID'
        });
    }

    res.status(200).json({
        status: 'Success',
        data: {
            user : _.pick(user, ['_id', 'name', 'email'])
        }
    });
});



function validateLogin(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    };

    return Joi.validate(req, schema);
}