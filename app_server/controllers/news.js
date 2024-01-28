console.log('Inside app_server, controllers, news.js file.');
/* GET news view */
const news = (req, res) => {
    try {
        console.log('Inside app_server, controllers, news.js, news function.');
        res.render('news', { title: 'Travlr Getaways '});
    } catch (error) {
        console.error('Error in news function:', error);
        res.status(500).send('Internal Sever Error');
    }
};

module.exports = {
    news
};