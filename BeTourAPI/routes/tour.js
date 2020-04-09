const express = require('express');
const { getAllTours, createNewTour, getTour } = require('../controllers/tour');
const { requireSignIn } = require('../controllers/auth');
const { userById } = require('../controllers/user');

const tourRouter = express.Router();

tourRouter.route('/')
    .get(getAllTours)
    .post(requireSignIn, createNewTour);

tourRouter.route('/:id')
    .get(getTour);

// any route containing : userId, our app  will first  execute userById()
tourRouter.param('userId', userById);

module.exports = tourRouter;