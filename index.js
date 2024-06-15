const express = require('express');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(errorHandler);
app.use(session({ secret: 'dog', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

const connectToDatabase = require('./config/db');
connectToDatabase();

app.get('/', (req, res)=>{
    res.send(req.user? req.user : 'not logged in with google or facebook')
  })

// Import routes
const auth = require('./routes/authRoute');

// Routes middlewares
app.use('/api/auth', auth);

app.listen(PORT, () => {
  console.log(`Connected on PORT ${PORT}`);
});
