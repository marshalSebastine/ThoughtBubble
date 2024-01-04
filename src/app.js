const express = require('express');
const helmet = require('helmet');
const config = require('./config/config');
const authRoutes = require('./routes/auth.route');
const sampleRoutes = require('./routes/sample.route');
const httpStatus = require("http-status");
const ApiError = require('./utils/ApiError');
const { convertErrorToApiError, errorHandler } = require('./middlewares/error');

const app = express()


// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

//use middlewares to sanitize db and script injection 



//setting up routes
app.use('/auth',authRoutes)
app.use('/sample',sampleRoutes)

app.use((req,res,next) => {
    next(new ApiError(httpStatus.NOT_FOUND,"no such endpoint"))
})

app.use(convertErrorToApiError)

app.use(errorHandler)

module.exports = app