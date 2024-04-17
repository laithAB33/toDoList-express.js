
const express = require('express')
const List_actions = require('../controllers_actions/List_actions.js')
const validator = require('../middleware/validate-update.js')
const verfiyToken = require('../middleware/verifyToken.js');

const Router = express.Router();

Router.route('/').get(verfiyToken,List_actions.getList)
                 .post(verfiyToken,List_actions.greateJob)

Router.route('/:id').delete(verfiyToken,List_actions.deleteJob)
                    .post(verfiyToken,validator,List_actions.updateJob)

module.exports =  Router;