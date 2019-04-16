const express = require('express')
const helmet = require('helmet')
const { connectDB, handleConnectionError } = require('./models');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // eslint-disable-line global-require
}
  
// add some security-related headers to the response
app.use(helmet())

app.use('/', require('./routes'));

// DB
connectDB()
handleConnectionError();

module.exports = app
