require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require("hbs");
const passport = require('passport');

require('./app_api/models/db'); // trigger database connection and mongoose schema models to be loaded

require('./app_api/config/passport');

const aboutRouter = require('./app_server/routes/about');
const contactRouter = require('./app_server/routes/contact');
const indexRouter = require('./app_server/routes/index');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const roomsRouter = require('./app_server/routes/rooms');
const travelRouter = require('./app_server/routes/travel');
const usersRouter = require('./app_server/routes/users');
const apiRouter = require('./app_api/routes/index'); // reference new app_api router

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files middleware
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d', // Set the maximum age of the cache (in this case, 1 day)
  etag: false,  // Disable ETag to prevent 304 responses based on ETag  
}));

app.use(passport.initialize());

// allow CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

/* Import JWT library
const jwt = require('jsonwebtoken');

// Function to decode JWT token and log its payload
const decodeToken = (req, res, next) => {
    // Extract token from the request headers
    const token = req.headers.authorization.split(' ')[1];

    // Decode the token
    const decoded = jwt.decode(token);

    // Log the decoded token
    console.log('Decoded token:', decoded);

    // Pass control to the next middleware or route handler
    next();
};

// Apply the decodeToken middleware to the route where JWT token is decoded
app.use('/api', decodeToken);
*/

// Define routes
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/rooms', roomsRouter);
app.use('/travel', travelRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter); // send request for '/api' to the api router

// catch unauthorized error and create 401
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({"message": err.name + ": " + err.message});
  }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
