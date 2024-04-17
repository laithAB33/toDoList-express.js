const jwt = require('jsonwebtoken');
module.exports = (payload,tokenName)=>{

    let Token = jwt.sign(payload,process.env[`${tokenName}`] ,
    { expiresIn: tokenName=="REFRESH_TOKEN_SECRET"?"7d":"30s"})

    return Token;
}