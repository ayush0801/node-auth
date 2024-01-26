const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
   },
   password: {
      type:String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum length of password is 6']
   },
});

// fire a function after doc saved to db
userSchema.post('save', function(doc, next) {
   console.log('new user was create and saved', this)
   next();
});

//fire a function before doc saved to db
userSchema.pre('save', async function(next) {
   // console.log('user is about to be created and saved', this)
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password,salt);

   next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;