const app=require('express').Router()
const bcrypt = require('bcrypt')
const userModel=require('../models/user.model')
const UserValidation=require('../middlewares/validationMiddleware')
app.post('/register',UserValidation,async( req,res)=>{
  try {
    const { name,email,password,confirmPassword,confirmedEmail}=req.body

const user = await userModel.findOne({email})
  if (user) {

     res.status(409).json({ message: "Client is already exist" })
  } 
  
  else {
    bcrypt.hash(password, 10, async function (err, hash) {

        await userModel.insertMany({name,email,password:hash})
        res.status(200).json({ message: "User inserted into DB" })
      })
  }
    
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error with Register a new User' });
  
  }
})
module.exports=app