const jwt = require('jsonwebtoken');
const appError = require('../helpers/appError.js');

module.exports = (req,res,next)=>{


    let token = req.cookies.accessToken;
    let decoded;

    try{
        decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    }catch(err){
            let error = new appError(err.message,401,"fail")
            return next(error)
    }

    req.userID = decoded.id;

    next();

}