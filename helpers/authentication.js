const bcrypt = require('bcryptjs')
const appError =  require('./appError')
module.exports = async(text,password)=>{

    let auth = await bcrypt.compare(text,password);

    if(!auth){
        let error = new appError("wrong password or email",400, "fail")
        next(error);
    }

}