console.log('Inside app_server, controllers, rooms.js file.');
/* GET rooms view */
const rooms = (req, res) => {
    try {
        console.log('Inside app_server, controllers, rooms.js, rooms function.');
        res.render('rooms', { title: 'Travlr Getaways '});
    } catch (error) {
        console.error('Error in rooms function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    rooms
};