const mongoose = require('mongoose'); //.set('debug', true);
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

/*
 * the code below has been modified as trying to get a single trip by code was returning []

// GET: /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    Model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

*/

// GET: /trips/:tripCode - returns a single trip
// There is error logging to try and find out why selecting single trips by code returns 'message: trip not found'

const tripsFindCode = async (req, res) => {
    const tripCode = req.params.tripCode; // Capture trip code from request parameters

    console.log('Searching for trip with code:', tripCode); // Log the trip code being used in the query

    Model
        .find({ 'code': tripCode }) // Use captured trip code in the query
        .exec((err, trips) => {
            if (err) {
                console.error('Error finding trip:', err); // Log any errors returned by the MongoDB execution callback
                return res.status(500).json(err);
            } else if (!trips || trips.length === 0) {
                console.log('Trip not found for code:', tripCode); // Log if trip is not found
                return res.status(404).json({ "message": "trip not found" });
            } else {
                console.log('Trip found for code:', tripCode); // Log if trip is found
                console.log('Query results:', trips); // Log the results of the query
                return res.status(200).json(trips[0]);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindCode
};