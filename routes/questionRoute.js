const express = require('express');
const questionController = require('../controller/questionController');

const questionRoute = express.Router();

questionRoute
    .route('/')
    .get(questionController.getAllQuestion)
    .post(questionController.createQuestion);

questionRoute
.route('/:id')
.get(questionController.getOneQuestion)

module.exports = questionRoute;