const express = require('express');
const logout = require('../controllers_actions/logout_actions.js');

const Router = express.Router();

Router.get('/',logout)

module.exports = Router;