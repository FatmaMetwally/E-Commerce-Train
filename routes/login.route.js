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
        const payload={user:user._id,role:"user"}
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_PRIVATE_KEY,
            { expiresIn: "14m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        )
      
      res.status(200).json({"Access Token":accessToken , "Refresh Token":refreshToken})
     
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