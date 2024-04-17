const User = require('../modules/uesr_modules.js')
const appError = require('../helpers/appError.js')
const asyncWrapper = require('../middleware/asyncWrapper.js')
const jwt = require("jsonwebtoken")
const genrateToken = require('../helpers/genrateToken.js')

let refresh = asyncWrapper( async(req,res,next)=>{

    if(!req.cookies?.refreshToken){
        let error = new appError("Unauthorized. Please login to access this resource",401,"fali")
        return next(error)
    }
    
    let oldRefreshToken = req.cookies.refreshToken;

    let foundUser = await User.findOne({refreshToken:oldRefreshToken})
    
    if(!foundUser){
        let error = new appError("forbidden",403,"fail");
        return next(error)
    }

    jwt.verify(oldRefreshToken,process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
        
            if(err || decoded.id !=foundUser._id){
                let error = new appError("forbidden",403,"fail");
                return next(error)
            }

            req.userID = decoded.id;

    })

    let payload = {gmail:foundUser.gmail,id:foundUser._id}

    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");

    await User.findOneAndUpdate({refreshToken:oldRefreshToken},{refreshToken},{new:true})


    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 7 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 15})

    

    res.status(200).json({success:true,status:"success",message:"the session is updated successfully",data:{accessToken}})

})

module.exports = refresh