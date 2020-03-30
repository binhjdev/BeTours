const express = require('express');
const { getAllTours, createNewTour, getTour } = require('../controllers/tour');

const tourRouter = express.Router();

tourRouter.route('/')
    .get(getAllTours)
    .post(createNewTour);

tourRouter.route('/:id')
    .get(getTour);

module.exports = tourRouter;