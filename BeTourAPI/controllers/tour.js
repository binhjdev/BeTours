const Tour = require('../models/tour');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTours = (req, res) => {
    const tours = Tour.find()
        .select('idTour name maxGroupSize ratingsAverage ratingsQuantity price summary description imageCover images startDates')
        .then(tours => {
            res.status(200).json({
                status: 'Success',
                results: tours.length,
                data: {
                    tours
                }

            });
        })
        .catch(err => console.log(err));
}

exports.createNewTour = (req, res) => {
    const newTour = new Tour(req.body);
    // save tour to db
    newTour.save((err, result) => {
        if (err) {
            return res.status(400).json({
                status: 'Failure',
                message: err
            });
        }
        res.status(200).json({
            status: 'Success',
            data: {
                newTour
            }
        });
    });
};

exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
        return next(new AppError('No tour found with that ID'), 404);
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour
        }
    });
});