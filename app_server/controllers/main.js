/* GET homepage */
const index = (req, res) => {
    console.log('Inside app_sever, controllers, main.js, index function.');
    res.render('index', { title: 'Travlr Getaways'});
}
module.exports = {
    index
};