const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [100, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0 '],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: String,
        required: [true, 'A tour must have a price']
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDate: {
        type: String,
        required: [true, " A tour must have a start date"]
    },
    location: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a location']
    },
    stationStop: {
        type: Number,
        required: [true, 'A tour must have a stop station']

    },
    timeVisit: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a time visit']
    }
});

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

autoIncrement.initialize(mongoose.connection);
tourSchema.plugin(autoIncrement.plugin, 'Tour');

module.exports = mongoose.model('Tour', tourSchema);