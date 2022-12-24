const catchAsync = require('../utillties/catchAsync');
const AppError = require('../utillties/appError');
const mainHandler = require('./mainHandler.js');
const Books = require('../model/bookModel');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file',file);
    cb(null, './public/images/books');  // set the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, `cover-${file.fieldname}-${Date.now()}.png`);  // set the file name
  }
});



module.exports.getBook = mainHandler.getOneDoc(Books)
module.exports.uploadBookPhoto = multer({ storage: storage });
module.exports.allBook = mainHandler.getAllDoc(Books);



module.exports.createBook = catchAsync(async (req, res, next) => {
  // var fullUrl = req.protocol + '://' + req.get('host');
  // if (req.file) {
  //   req.body.coverImage = `/images/books/${req.file.filename}`
  // }
  // const doc = await Books.create(req.body);

  console.log(req.file);
  res.status(201).json(
    {
      status: "success",
      data: {
        // data: doc
      }
    }
  );

})


