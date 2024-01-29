console.log('Inside app_server, controllers, travel.js file.');

var fs = require('fs');

var trips = JSON.parse(fs.readFileSync('./data/trips.json', "utf8"));

/* GET travel view */
const travel = (req, res) => {
    try {
        console.log('Inside app_server, controllers, travel.js, travel function.');
        res.render('travel', { title: 'Travlr Getaways', trips});
    } catch (error) {
        console.error('Error in travel function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    travel
};