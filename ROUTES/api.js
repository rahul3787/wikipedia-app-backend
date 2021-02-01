const express = require('express');
const { check, validationResult } = require('express-validator');
const router =express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs =require('bcryptjs');
const UserSchema = require('../config/User')
const History = require('../config/history')
const config = require('config')
const jwtSecret = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
const auth =require("../middleware/auth")
router.get('/user',auth,async(req,res)=>{
  try {
    const User =await UserSchema.findById(req.user.id).select('-password');
    res.json(User);
  } catch (error) {
    console.log(errors.message);
        return res.status(500).json({ msg : "server s...."})
        
  }
}
)
router.post('/reg',
[
    check('email','e-mail is required').isEmail(),
    check('password','password is required').not().isEmpty()
],
  async (req,res)=>{
    try {
      let {email,password}= req.body;
      let user = await UserSchema.findOne({email: email})
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(401).json({ errors: errors.array()});
       }
      
      if(user){
        return res.status(400).json({msg:"ther is already user with this name"});
      }
      const salt = await bcryptjs.genSalt(10);
      password = await bcryptjs.hash(password,salt);
      user = new UserSchema({
        email,
        password
      });
      await user.save();
      const payload ={
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        jwtSecret,
        (err,token) =>{
          if(err) throw err;
          res.json({token});
        }
      )
      // res.send(req.body);
    } catch (errors) {
      console.log(errors.message);
      return res.status(500).json({ msg : "server s...."})
      
    }
  }
  )
  router.post('/login',
  [
      check('email','e-mail is required').isEmail(),
      check('password','password is required').not().isEmpty()
  ],
   async (req,res)=>{
      try {
        let {email,password}= req.body;
        let user = await UserSchema.findOne({email})
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          return res.status(401).json({ errors: errors.array()});
         }
        
        if(!user){
          return res.status(401).json({msg:"their is no user with this email"});
        }
        let isPasswordMatch = await bcryptjs.compare(password,user.password);
        if(isPasswordMatch){
          const payload ={
            user: {
              id: user.id
            }
          }
          jwt.sign(
            payload,
            jwtSecret,
            (err,token) =>{
              if(err) throw err;
              res.json({token});
            }
          )
        }else return res.status(401).json({msg : "wrong password"})
      } catch (errors) {
        console.log(errors.message);
        return res.status(500).json({ msg : "server s...."})
        
      }
    }
    )
    router.get('/api',(req ,res)=>{
   
      History.find({ })
       .then((data)=>{
           console.log('Data:', data);
           res.json(data);
  
       })
       .catch((error)=>{
           console.log('error', daerrorta)
  
       })
      
  });
  
  
  
  
  
  
  
  
  // API ADD FILE Data
  router.post('/single',  (req, res) => {
      
   
      const newHistoryPost = new History({
          title: req.body.title,
          body:req.body.body,
          
      });
  
      console.log(newHistoryPost, "newHistoryPost")
  
      newHistoryPost.save((error)=>{
          if (error){
              res.status(500).json({msg : 'sorry, internal server errors'});
          }else {
              res.json({
                  msg:'your data has been saved'
              });
          }
      })
  
      
    });
module.exports = router;