const express = require('express');
const questionController = require('../controller/questionController');

const groupRoute = express.Router();

groupRoute
    .route('/')
    .get(questionController.allGroup)
    .post(questionController.createGroup);

groupRoute
    .route('/:id')
    .get(questionController.getOneGroup)


module.exports = groupRoute;