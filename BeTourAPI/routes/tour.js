const express = require('express');
const { getAllTours, createNewTour } = require('../controllers/tour');

const tourRouter = express.Router();

tourRouter.route('/')
    .get(getAllTours)
    .post(createNewTour);

module.exports = tourRouter;