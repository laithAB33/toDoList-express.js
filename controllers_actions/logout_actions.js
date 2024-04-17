const User = require('../modules/uesr_modules.js')
const appError = require('../helpers/appError.js')
const asyncWrapper = require('../middleware/asyncWrapper.js')


let logout = asyncWrapper( async(req,res,next)=>{

    if(!req.cookies?.refreshToken){
        return res.status(204).json({success:true, status:"success", message:"you already logout", data:null})
    }

    const refreshToken = req.cookies.refreshToken;

    let foundUser = await User.findOne({refreshToken})

    if(!foundUser){
        res.clearCookie("refreshToken",{httpOnly:true}) // maxage shoud be seed but i dont know how why
        return res.status(204).json({success:true, status:"success", message:"you already logout", data:null})
    }

    foundUser.refreshToken = null

    await foundUser.save();

    res.clearCookie("refreshToken",{httpOnly:true})
    res.status(204).json({success:true, status:"success", message:"you logout", data:null})

})

module.exports = logout













// 204 successfully req but there is content use if he ask for logout and he already are

