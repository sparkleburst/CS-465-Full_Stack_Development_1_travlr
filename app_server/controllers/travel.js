console.log('Inside app_server, controllers, travel.js file.');

const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

// above allows API endpoints to pull data from database
// below allowed pulling data from json files
// var fs = require('fs');
// var trips = JSON.parse(fs.readFileSync('./data/trips.json', "utf8"));

/* GET travel view - This was the old way with json
const travel = (req, res) => {
    try {
        console.log('Inside app_server, controllers, travel.js, travel function.');
        pageTitle = process.env.npm_package_description + ' - Travel ';
        res.render('travel', { title: pageTitle, trips});
    } catch (error) {
        console.error('Error in travel function:', error);
        res.status(500).send('Internal Sever Error');
    }
};
*/

/* render travel list view */
const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = 'Mo trips exist in database!';
        }
    }

    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });
};

/* GET travel list view */
const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    console.info('>> travelController.travelList calling ' + requestOptions.url);

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (err) {
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    )
}

module.exports = {
    travelList
};