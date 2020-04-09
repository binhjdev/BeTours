const express = require('express');
const auth = require('../controllers/auth');
const { userById } = require('../controllers/user');

const authRouter = express.Router();

authRouter.post('/signup', auth.signup);
authRouter.post('/login', auth.login);
authRouter.get('/logout', auth.logout);

// any route containing : userId, our app  will first  execute userById()
authRouter.param('userId', userById);

module.exports = authRouter;