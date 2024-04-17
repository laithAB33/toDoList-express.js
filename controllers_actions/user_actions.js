const User = require('../modules/uesr_modules.js')
const asyncWrapper = require('../middleware/asyncWrapper.js')
const appError =  require('../helpers/appError')
const bcrypt = require('bcryptjs')
const authentication = require('../helpers/authentication.js')
const genrateToken = require('../helpers/genrateToken.js')
const cookieParser = require('cookie-parser')

let register = asyncWrapper( async(req,res,next)=>{

    const {gmail , password} = req.body;

    let check = await User.findOne({gmail})

    if(check){
        let error = new appError("email already in use",400,"fial")
        return next(error)
    }

    let hashedPassword = bcrypt.hashSync(password,10);

    let newUser = new User({gmail,password:hashedPassword});

    console.log(newUser._id);

    // deal with token
    let payload = {gmail,id:newUser._id}
    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");

    newUser.refreshToken = refreshToken;

    await newUser.save();

    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 7 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 15})

    res.status(201).json({success:true,status:"success",message:"user created successfully",data:{newUser,accessToken}});

    })

let login = asyncWrapper( async(req,res,next) => {

    let {gmail, password} = req.body;

    let oldUser = await User.findOne({gmail});

    if(!oldUser) {
        let error = new appError("User not found",404, "fail")
        next(error);
    }
    
    authentication(password, oldUser.password);

    // deal with token 
    let payload = {gmail,id:oldUser._id}
    const accessToken = genrateToken(payload,"ACCESS_TOKEN_SECRET");
    const refreshToken = genrateToken(payload,"REFRESH_TOKEN_SECRET");

    await User.findOneAndUpdate({_id:oldUser._id},{refreshToken:refreshToken})

    res.cookie("refreshToken",refreshToken,{maxAge:1000 * 60 * 60 *24 * 7 ,httpOnly:true})
    res.cookie("accessToken",accessToken,{maxAge:1000 * 60 * 15})

    res.status(200).json({ success:true, status:"success", message:"user logged in successfully", data:{id:oldUser._id,accessToken} });


})
 



module.exports ={register ,login}

