const appError = require('../helpers/appError.js')

module.exports = (req, res, next) => {

    const data = req.body
    
    Object.keys(data).forEach(key =>{
        if(data[key] == "" || typeof data[key] != 'string'){
            let error = new appError("not valid request",400,"fail");
            return next(error)
        }
    })

    next()
}