const { Router } = require('express');
const authController = require('../controllers/authController');


const userModel = require('../models/User')

const router = Router();

router.get('/signup', authController.signup_get); //not required for Backend
router.get('/login', authController.login_get); //not required for backend
router.post('/signup',authController.signup_post); 
router.post('/login', authController.login_post);
/*
router.post('/signup', (req, res) => {
   const {email, password} = req.body
   if(!email || !password){
      return res.status(422).json({error: "Please fill the details"});
   }
   if(!isEmailValid){
      return res.status(403).json({error: "Invalid Email"})
   }
   bcrypt.hash(password, 12)
   .then((hashedPassword)=>{
      const newUser = new userModel({email, password:hashedPassword});
      newUser.save()
      .then((data) => {
         return res.status(200).json({message: "Signed Up successfully"})
      })
      .catch((err) => {
         console.log("1")
         console.log(err)
         return res.json({error: err});
      })
   })
   .catch((err) => {
      console.log("2")
      console.log(err)
      return res.status(500).json({error: err})
   })
})
*/

module.exports = router;   