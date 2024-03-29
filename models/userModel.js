const mongoose = require('mongoose');
const {isEmailValid} = require('../utility/validation');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      trim: true,
      lowecase: true
   },
   password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
   },
});

const User = mongoose.model('user', userSchema);

module.exports = User;