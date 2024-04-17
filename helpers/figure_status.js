function figure_status(statusCode){
    return statusCode>=400&&statusCode<500?"fail":"error"
}
module.exports = figure_status;