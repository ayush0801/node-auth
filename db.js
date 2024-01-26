const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;

mongoose.connect(url)
.then((db) => {
   console.log(`Connected to MongoDB with ID ${db.connection.id}`);
})
.catch((err) => {
   console.error("Error connecting to MongoDB", err);
})