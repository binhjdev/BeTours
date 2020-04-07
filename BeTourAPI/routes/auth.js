const express = require('express');
const auth = require('../controllers/auth');

const authRouter = express.Router();

authRouter.post('/signup', auth.signup);
authRouter.post('/login', auth.login);
authRouter.get('/logout', auth.logout);

module.exports = authRouter;