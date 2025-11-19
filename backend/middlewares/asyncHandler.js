const asyncHandler =(fn)=>(req ,res ,next)=>{
    Promise.resolve(fn(req ,res,next))
    .catch((error)=>{
        res.status(500).json({message: error.message});
       });
};

export default asyncHandler;

//The idea here is to wrap the asynchronous function fn inside a middleware function that can handle promise-based errors.

