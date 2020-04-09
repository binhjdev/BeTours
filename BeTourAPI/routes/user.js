const express = require('express');
const { userById, getAllUser, getUser } = require('../controllers/user');

const userRouter = express.Router();

userRouter.route('/')
    .get(getAllUser);
userRouter.route('/:userId')
    .get(getUser);


// any route containing : userId, our app  will first  execute userById()
userRouter.param('userId', userById);

module.exports = userRouter;