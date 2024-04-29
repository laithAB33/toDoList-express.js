const express = require('express');
const user_controller = require('../controllers_actions/user_actions')

const Router = express.Router();

Router.post('/register', user_controller.register)

Router.post('/login', user_controller.login)

module.exports = Router;