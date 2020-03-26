const express = require('express');
const { signup } = require('../controllers/auth');

const authRouter = express.Router();

authRouter.route('/')
    .post(signup);

module.exports = authRouter;