const express = require('express')
const router = express.Router()
const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const protect = require('../middlewares/authMiddleware')


router.post('/login',asyncHandler(async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email:email})
    console.log(user)
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })

    }else{
        res.status(401)
        throw new Error('invalid email or password')
    }
   
}))
router.post('/register',asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body
    const userExists = await User.findOne({email:email})
    if(userExists){
        res.status(404) 
        throw new Error('user already exists')
      

    }
    const user = await User.create({
        name,email,password
    })
    if(user){
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('invalid user data')
    }
   
}))

router.get('/profile/:id',asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id)  
  if(user){
    res.json({
        id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        //token:generateToken(user._id)

    })

  }else{
      res.status(404)
      throw new Error('user not found')
  }
}))

  router.put('/profile/:id',asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)  
    if(user){
      user.name = req.body.name || user.name,
      user.email = req.body.email || user.email 
      if(req.body.password){
        user.password = req.body.password || user.password 

      }
      const userUpdated = await user.save()
      res.json({
        name:userUpdated.name,
        email:userUpdated.email,
        isAdmin:userUpdated.isAdmin,
    })
    console.log('id :',req.params.id)
    console.log('user :',user)
    console.log('userUpdated :',userUpdated)

  
    }else{
        res.status(404)
        throw new Error('user not found')
    }
  }))
router.get('/',asyncHandler(async(req,res)=>{
    const users = await User.find({})
    res.json(users)
    
   
}))
router.get('/:id',asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    res.json(user)
    
   
}))
router.delete('/:id',asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    user.remove();
    res.send('user deleted successufly')
    
   
}))
router.put('/:id',asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email 
        user.isAdmin = req.body.isAdmin || user.isAdmin 

       
        const userUpdated = await user.save()
        res.json({
          name:userUpdated.name,
          email:userUpdated.email,
          isAdmin:userUpdated.isAdmin,
      })
      console.log('id :',req.params.id)
      console.log('user :',user)
      console.log('userUpdated :',userUpdated)
  
    
      }else{
          res.status(404)
          throw new Error('user not found')
      }
    
   
}))
module.exports = router