const userModel = require('../models/User');
const { isEmailValid } = require('../utility/validation');
const bcrypt = require('bcrypt');
require('../db')

//Handle Error
const handleErrors = (err) => {
   // console.log(err.message, err.code);
   let errors = { email: '', password: ''};

   //duplicate error code
   if (err.code === 11000){
      errors.email = "This email is already registered";
      return errors;
   }

   //valiadtion errors
   if(err.message.includes('user validation failed')){
      Object.values(err.errors).forEach(({properties}) => {
         errors[properties.path] = properties.message;
      });
   }
   return errors;
}

module.exports.signup_get = (req, res) => {
   res.render('signup');
}

module.exports.login_get = (req, res) => {
   res.render('signup');
}

module.exports.signup_post = async (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
      return res.status(422).json({error: "Please fill the details"});
   }
   if(!isEmailValid){
      return res.status(403).json({error: "Invalid Email"})
   }
   const hashedPassword = await bcrypt.hash(password, 12);
      
   const newUser = new userModel({email, password: hashedPassword});
   userModel.findOne({email})
   .then((data) => {
      if(!data) {
         // try{
            newUser.save()
            .then((data) => {
               return res.status(200).json({message: "Signed Up Successfully"});
            })
            .catch((err) => {
               // console.log(err)
               return res.status(400).json({error: err});
            })
         // }
         // catch{
         //    console.log(err)
         //    return res.status(500).json({error: err});
         // }
      }
      else{
         return res.status(409).json({error:"Email already in use."});
      }
   })
   .catch((err) => {
      return res.json({error: err});
   })

   
   // const hashedPassword = await bcrypt.hash(password, 12);

   // .then((hashedPassword)=>{
   //    const newUser = new userModel({email, password:hashedPassword});
   //    newUser.save()
   //    .then((data) => {
   //       return res.status(200).json({message: "Signed Up successfully"})
   //    })
   //    .catch((err) => {
   //       // console.log("1")
   //       // console.log(err)
   //       return res.json({error: err});
   //    })
   // })
   // .catch((err) => {
   //    // console.log("2")
   //    // console.log(err)
   //    return res.status(500).json({error: err})
   // })
}

module.exports.login_post = async (req, res) => {
   const {email, password} = req.body;
   // console.log(email, password);

   res.send('user login');
}