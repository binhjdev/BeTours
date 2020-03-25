const fs = require('fs');
const express = require('express');
const app = express();


// middleware
app.use(express.json());


const PORT = 3000;

// dummy data
// read data from folder 'dev-data/data/tours-simple.json'
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// api get all tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'Success',
        results: tours.length,
        data: {
            tours
        }

    });
});

// api post new tour
app.post('/api/v1/tour', (req, res) => {
    // newId = last id of array tours + 1;
    const newId = tours[tours.length - 1].id + 1;
    // assign newTour
    const newTour = Object.assign({ id: newId }, req.body);

    // push newTour to array tours
    tours.push(newTour);

    // write new tour to file tours-simple.json
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).
        json({
            status: 'Success',
            data: {
                tour: newTour
            }
        });
    });
});

// api get detail tour = id
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    // get id param request
    const id = req.params.id * 1;
    // get detail in array tours by id
    // link stackoverflow : https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
    const tour = tours.find(el => el.id === id);

    
    if (!tour) {
        return res.status(404)
            .json({
                status: 'fail',
                message: 'Invalid ID'
            });
    }

    res.status(200).
    json({
        status: 'Success',
        data: {
            tour
        }

    });

});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});