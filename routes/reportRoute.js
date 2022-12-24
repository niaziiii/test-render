const express = require('express');
const reportController = require('../controller/reportController');
const reportRoute = express.Router();

reportRoute
    .route('/')
    .get(reportController.allReport)
    .post(reportController.createReport);
    
reportRoute
    .route('/:id')
    .get(reportController.singleReport)

module.exports = reportRoute;