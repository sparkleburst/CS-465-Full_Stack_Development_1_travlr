console.log('Inside app_server, controllers, travel.js file.');
/* GET travel view */
const travel = (req, res) => {
    try {
        console.log('Inside app_server, controllers, travel.js, travel function.');
        res.render('travel', { title: 'Travlr Getaways '});
    } catch (error) {
        console.error('Error in travel function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    travel
};