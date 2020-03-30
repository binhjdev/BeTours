const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

exports.signup = catchAsync(async (req, res, next) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            status: 'Fail',
            message: 'Email is exists'
        });
    }

    const newUser = await User.create(req.body);
    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'Success',
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check email and password exitst
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything is ok , send token to client 
    const token = signToken(user._id);
    res.status(200).json({
        status: 'Success',
        token
    });
});

