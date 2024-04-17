const figure_status = require('../helpers/figure_status');

module.exports = (error,req,res,next) => {

    let status = figure_status(error.statusCode || 500);

    res.status(error.statusCode || 500).json( {

        success: false,
        status,
        message: error.message,
        data: null,
        L:1
        
    } )

}