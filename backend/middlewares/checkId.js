import {isValidObjectId} from 'mongoose';

//req ,res ,next is used for middlewares
function checkId(req ,res ,next) {
    if(!isValidObjectId(req.params.id)){
         res.status(404);
         throw  new Error(`Invalid Object of: ${req.params.id}`)
    }
    next();
}

export default checkId;