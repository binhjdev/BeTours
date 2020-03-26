const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();

// connect db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("DB connected!"));

mongoose.connection.on("error", err => {
    console.log(`DB connection error ${err.message}`);
});

// bring in routes
const tourRoutes = require('./routes/tour');
const authRoutes = require('./routes/auth');

// midleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/users/signup", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App running on ${port}`);
});