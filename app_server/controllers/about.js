console.log('Inside app_server, controllers, about.js file.');
/* GET about view */
const about = (req, res) => {
    try {
        console.log('Inside app_server, controllers, about.js, about function.');
        res.render('about', { title: 'Travlr Getaways ' });
    } catch (error) {
        console.error('Error in travel function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    about
};