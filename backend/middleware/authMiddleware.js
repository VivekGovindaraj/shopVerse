import jwt from 'jsonwebtoken'
import User from '../models/User.js'


// protect checkeing and verfiying jwt agasnst user loged in user

export const protect = async(req, res, next) => {

    console.log("middle ware stared")
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        try{
             token = req.headers.authorization.split(" ")[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decode.id).select("-password")
            next()
         

        }catch(error){
            res.status(401).json({
                messsage:"Not authorised , toke failed"
            })
        }

       
    }

    if(!token){
         res.status(401).json({
                messsage:"Not authorised , toke failed"
            })
    }
}


// Admin Middleware

export const isAdmin = async(req,res,next) => {

    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401).json({
            messsage:"Not Authorized, You are not Admin"
        })
    }
}