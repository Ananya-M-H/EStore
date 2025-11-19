import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from './asyncHandler.js';

const authenticate = asyncHandler(async(req ,res ,next)=>{
    let token;
    //read the jwt from the 'jwt' cookie
    token =req.cookies.jwt;

    if(token){
        try{ 
            //.verify() id there from the jwt 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //findById() is  a mongoose method
            req.user = await User.findById(decoded.userId).select('-password');
            next(); //to ge to the other middleware

        }catch{
            res.status(401);
            throw new Error("Not authorized token failed"); 
        }
    }
     else{
        res.status(401);
        throw new Error("Not authorized, no token");
     }  
});


//check for the admin ,if the user is admin
const authorizeAdmin = (req ,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send("Not authorized as an admin");

    }
}

export {authenticate ,authorizeAdmin};
