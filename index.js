//index.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session')
const mongoose  = require('mongoose');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(errorHandler); // error handler middleware
app.use(session({ secret: 'dog'}));
app.use(passport.initialize());
app.use(passport.session());

const connectToDatabase = require('./config/db');
connectToDatabase(); // database function

app.get('/', (req, res) =>{
    res.send( `DEFAULT ROUTE IS WORKING`)
});


// Import routes
const auth = require('./routes/authRoute');

// Routes middlewares
app.use('/api/auth', auth);




app.listen(PORT, ()=>{
  console.log(`Connected on PORT ${PORT}`)
})