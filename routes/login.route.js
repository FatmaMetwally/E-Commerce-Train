const app=require('express').Router()
const bcrypt = require('bcrypt') 
const userModel=require('../models/user.model')
const jwt = require('jsonwebtoken')

app.post('/login', async(req,res)=>{
try {
    const {email,password}=req.body
const user= await userModel.findOne({email})
if (user){

    const match = await bcrypt.compare(password,user.password)
    if (match){
      const token=  jwt.sign({user:user._id,role:"user"},'fatma')
      res.status(200).json({token})
     
    }
    else 
    {
        res.status(401).json({message:"wrong password"}) 
    }
}
else               
{
    res.status(404).json({message:"user dosn't exist"})
}
}
 catch (error) {
    console.error(error);
      res.status(500).json({ message: 'Internal server error with Login' });
  
}

})
module.exports=app