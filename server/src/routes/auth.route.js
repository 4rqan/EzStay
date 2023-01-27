const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken')
const User = require("../models/user.model")
const bcrypt = require("bcrypt");

route.post('/signup', async (req, res) => {
  let {username, password, email} = req.body;

  if(!email || !password || !username){
    return res.status(400).send("Please pass all required fields");
  }
  username = username.toLowerCase();
  email = email.toLowerCase();

 const usernameExists = await User.findOne({username});
 if(usernameExists){
  return res.status(400).send("Username already exists");
 }

 const emailExists = await User.findOne({email});
 if(emailExists){
  return res.status(400).send("Email already exists");
 }

 const encryptedPassword = await bcrypt.hash(password, 10);

 const user = new User();
 user.password = encryptedPassword;
 user.email = email;
 user.username = username;
 user.role = "Customer";
 user.createdOn = (new Date()).toString()

 await user.save();
 res.send(generateToken(user));
})

route.post('/login', async (req, res) => {
    let {username, password} = req.body

    if(!password || !username){
      return res.status(400).send("Please pass all required fields");
    }
    username = username.toLowerCase();
    const user = await User.findOne({username})

    if(!user){
      return  res.status(404).send('Invalid username');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return  res.status(404).send('Incorrect password');
      }

    return res.send(generateToken(user))
})

const generateToken = (user)=>{
 const token = jwt.sign(
  {
    username : user.username,
    email: user.email,
    userId :user._id
  }, "HelloWord", {expiresIn : '2h'})

  return {
    userId : user._id,
    username: user.username,
    email: user.email,
    token
  };
}

module.exports = route;


