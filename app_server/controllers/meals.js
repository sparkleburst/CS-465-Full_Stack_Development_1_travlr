console.log('Inside app_server, controllers, meals.js file.');
/* GET meals view */
const meals = (req, res) => {
    try {
        console.log('Inside app_server, controllers, meals.js, meals function.');
        res.render('meals', { title: 'Travlr Getaways '});
    } catch (error) {
        console.error('Error in meals function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    meals
};