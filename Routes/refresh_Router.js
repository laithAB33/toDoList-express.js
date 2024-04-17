const express = require('express');
const refresh = require('../controllers_actions/refresh_actions.js');

const Router = express.Router();

Router.get('/',refresh)

module.exports = Router;