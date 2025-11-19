import User from '../models/userModel.js'
import asyncHandler from '../middlewares/asyncHandler.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

const createUser = asyncHandler(async(req ,res)=>{
    const {username, email ,password} =req.body;
    
    if(!username||!email|| !password){
        throw new Error('Please fill all the inputs.');
    }

    const userExists = await User.findOne({email});
    if (userExists) res.status(400).send('User alredy exists');
    
    const salt = await bcrypt.genSalt(10);//you can provide 100 also ,but a lot of salts aren;t that good ,it slows down your application
    const hashedPassword = await bcrypt.hash(password , salt);

    //creating a user(acc to the userSchema) ,so provide some salt gibberh to it
    const newUser = new User({username ,email ,password: hashedPassword }); 

    try{
          await newUser.save();//mongoose method to store new database
          //to make it appear to the user:but this is making even the password to be seen to the database ,it should'nt happen
          createToken(res ,newUser._id);

          res.status(201).json(
            {_id:newUser._id,
              username: newUser.username ,
              email:newUser.email ,
              isAdmin:newUser.isAdmin
            });
    } 
    catch(error){
        res.status(400);
        throw new Error("Invalid user data");
    } 
});

    const loginUser =asyncHandler(async (req,res)=>{
        const {email ,password} = req.body;
        
        //checking if the user alredy exists (check from the db)
        const existingUser = await User.findOne({email});

        if(existingUser){
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        
        //if tghere is a valid password ,create a token
         if( isPasswordValid){
            createToken(res ,existingUser ._id); 

            res.status(201).json(
            {_id:existingUser._id,
              username: existingUser.username ,
              email: existingUser.email ,
              isAdmin: existingUser.isAdmin
            });
        }else{
            res.status(401);
            throw new Error("Invalid email or password")
        }
            return //exit the function after sending the response
        }
    
    })
  
    const logoutCurrentUser = asyncHandler(async (req ,res)=>{

        res.cookie('jwt', '',{
        httpOnly :true,
        expires:new Date(0),
    })

    res.status(200).json({message: "Logged out successfully"});
});

const getAllUsers =asyncHandler(async(req ,res)=>{
    const users = await User.find({});//give us everything
    res.json(users);
    })

const getCurrentUserProfile=asyncHandler(async(req ,res)=>{
    const user =await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            username:user.username,
            email:user.email,
        })
    }else{
        res.status(404);
        throw new Error("User not found.");
    }
})


const updateCurrentUserProfile = asyncHandler(async (req ,res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        //if the user provides new username ,update that username ,else do not (keep the old one)
        user.username = req.body.username || user.username;
        user.email =req.body.email || user.email;

        if(req.body.password){
            const salt = await bcrypt.genSalt(10);//you can provide 100 also ,but a lot of salts aren;t that good ,it slows down your application
            const hashedPassword = await bcrypt.hash(req.body.password , salt);
            user.password =hashedPassword;
        }
        
        //storing in teh database
        const updatedUser = await user.save();
       
        //displaying to the user
        res.json({
          _id:updatedUser._id,
          username:updatedUser.username,
          email :updatedUser.email,
          idAdmin :updatedUser.isAdmin
        });
    }
    else{
        res.status(404);
        throw new Error("User not found");
    }
})

const  deleteUserById =asyncHandler(async(req ,res)=>{
    const user = await User.findById(req.params.id);

    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin user');
        }
        await User.deleteOne({_id:user._id})
        res.json({message:"User removed"})
    }
    else{
        res.status(404);
        throw new Error("User not found.");
    }

})

const getUserById = asyncHandler(async(req ,res)=>{
  const user =  await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user);
  }
  else{
    res.status(404);
    throw new Error("User not found");
  }
})

const updateUserById= asyncHandler(async(req ,res)=>{
   const user =await User.findById(req.params.id)

   if(user){
    user.username = req.body.username || user.username
    user.email =req.body.email || user.email
    user.isAdmin = Boolean(req.body.isAdmin)

    const updatedUser = await user.save()
    
    res.json({
        _id:updatedUser._id,
        username:updatedUser.username,
        email :updatedUser.email,
        isAdmin :updatedUser.isAdmin

    })
   }
    else{
    res.status(404);
    throw new Error("User not found");
}
})
 
export {createUser ,
       loginUser,
       logoutCurrentUser ,
       getAllUsers ,
       getCurrentUserProfile,
       updateCurrentUserProfile ,
       deleteUserById,
       getUserById ,
       updateUserById};