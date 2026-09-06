import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
    
dotenv.config()


// genearate token 

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES
    })
}
//get user 

export const user = async (req, res) => {
res.json({
        msg:"helllo1"
    })
}


// Register User /api/auth/register
export const registerUser = async (req,res) => {

    try{
    const {name,email,password,isAdmin} = req.body

    const userExist = await User.findOne({email})
    if(userExist) {
      return   res.status(400).json({
            message:"User already exist"
        })
    } 

    const newUser = await User.create({name,password,email,isAdmin  })

    if(newUser){
        res.status(201).json({
            success:true,
            message:"New user created",
           _id :newUser._id,
           name:newUser.name,
           email:newUser.email,
           isAdmin:newUser.isAdmin,
            token:generateToken(newUser._id)
            
        })
    }else{
        res.status(400).json({
            message:`Invaild user dat pls check enetered data`
        })
    }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }


}

// login user api/auth/login

export const loginUser = async(req,res) => {
try{
    const {email, password} = req.body
    const user = await User.findOne({email})

     if(user && await user.matchPassword(password)){
        res.status(200).json({
            success:true,
            message:"login success",
           _id :user._id,
           name:user.name,
           email:user.email,
           isAdmin:user.isAdmin,
             token:generateToken(user._id)
            
        })
    }else{
        res.status(400).json({
            message:`Invaild Email or Paasword.. Pls cross check enetered data`
        })
    }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }

}

// get user profile

// api/auth/profile

export  const getUserProfile = async(req,res) => {

try{
     const user = await User.findById(req.user._id).select("-password")

     res.json(user)
}catch(error){
    res.status(500).json({
        message:error.message
    })
}
   


 }