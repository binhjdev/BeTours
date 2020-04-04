const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

dotenv.config();

// connect db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("DB connected!"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error ${err.message}`);
});

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// bring in routes
const tourRoutes = require('./routes/tour');
const authRoutes = require('./routes/auth');

// midleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(cors());
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App running on ${port}`);
});