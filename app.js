const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
require('./db');
require('dotenv').config();
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
