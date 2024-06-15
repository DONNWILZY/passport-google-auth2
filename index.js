//index.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
dotenv.config();
const PORT = process.env.PORT || 5000
app.use(express.json());

const connectToDatabase = require('./config/db');
connectToDatabase(); // database function

app.get('/', (req, res) =>{
    res.send( `DEFAULT ROUTE IS WORKING`)
});





app.listen(PORT, ()=>{
  console.log(`Connected on PORT ${PORT}`)
})