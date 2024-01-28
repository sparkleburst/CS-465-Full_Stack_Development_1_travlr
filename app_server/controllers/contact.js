console.log('Inside app_server, controllers, contact.js file.');
/* GET contact view */
const contact = (req, res) => {
    try {
        console.log('Inside app_server, controllers, contact.js, contact function.');
        res.render('contact', { title: 'Travlr Getaways '});
    } catch (error) {
        console.error('Error in contact function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    contact
};