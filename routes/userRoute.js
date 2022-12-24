const express = require('express');
const userController = require('../controller/userController.js');
const userRouter = express.Router();


userRouter
    .route('/')
    .get(userController.allUsers)
    .post(userController.createUser)


userRouter
    .route('/:id')
    .get(userController.getUser)
    .post(userController.updateUser);





module.exports = userRouter;