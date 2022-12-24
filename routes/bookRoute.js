const express = require('express');
const bookController = require('../controller/bookController');

const bookRoute = express.Router();

bookRoute
    .route('/')
    .get(bookController.allBook)
    .post(bookController.uploadBookPhoto.single('image'), bookController.createBook);

bookRoute
.route('/:id')
.get(bookController.getBook);


module.exports = bookRoute;