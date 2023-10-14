const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware!!');
  next();
});

app.use((req, res, next) => {
  const requestTime = new Date().toISOString();

  req.requestTime = requestTime;
  next();
});

// router is simply a middleware

// bc it is middleware so we using app.use here to add to middleware stack
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
