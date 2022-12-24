const express = require('express');
const userController = require('../controller/userController.js');

const authRouter = express.Router();



authRouter.post('/login', userController.loginUser);
authRouter.post('/islogged', userController.protect);

module.exports = authRouter;
