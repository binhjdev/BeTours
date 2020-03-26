const Tour = require('../models/tour');

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