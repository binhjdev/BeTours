const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const tourSchema = new mongoose.Schema({
    name: String,
    maxGroupSize: Number,
    ratingsAverage: Number,
    ratingsQuantity: Number,
    price: Number,
    summary: String,
    description: String,
    imageCover: String,
    images: [String],
    startDates: [String]
});

autoIncrement.initialize(mongoose.connection);
tourSchema.plugin(autoIncrement.plugin, 'Tour');

module.exports = mongoose.model('Tour', tourSchema);