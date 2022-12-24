const mainHandler = require('./mainHandler.js')
const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const catchAsync = require('../utillties/catchAsync.js')
const AppError = require('../utillties/appError.js')

const TokenGenerate = id => {
    return jwt.sign({ id: id }, process.env.JWTSECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    });
};



const createSendTokenCookie = (user, statusCode, res) => {
    const token = TokenGenerate(user._id);

    const cookieOptions = {
        expire: new Date(Date.now() + process.env.JWT_Cookie_EXPIRE_IN * 24 * 30 * 60 * 1000),
        httpOnly: true
    };

    // if (process.env.NODE.ENV === "production") cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions)

    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    })
}



module.exports.allUsers = mainHandler.getAllDoc(UserModel);
module.exports.getUser = mainHandler.getOneDoc(UserModel, { path: 'report' });
module.exports.createUser = mainHandler.createOne(UserModel);
module.exports.updateUser = mainHandler.updateOne(UserModel);

module.exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!password || !email) return next(new AppError('Provided email & password incorrect', 401));

    const user = await UserModel.findOne({ email }).select('+password')

    if (!user) return next(new AppError('incorrect email & password', 401));

    if (password !== user.password) return next(new AppError('incorrect password', 401));

    if (!user) return next(new AppError('incorrect user', 401));

    let mainUser;
    if (user.role === 'admin') mainUser = await UserModel.findById(user.id)
    else mainUser = await UserModel.findById(user.id).populate({ path: 'report' });

    createSendTokenCookie(mainUser, 200, res)

})


module.exports.protect = catchAsync(async (req, res, next) => {
    //  1). getting token and check it
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) { token = req.headers.authorization.split(' ')[1]; }
    else if (req.cookies.jwt) { token = req.cookies.jwt }
    else if (req.headers.jwt) { token = req.headers.jwt }
    else if (req.body.jwt) { token = req.body.jwt }



    if (!token) return next(new AppError('Your are not logged in! Please login to get access', 401));

    // 2). Verification token like user id 
    const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET)


    // 3). Check if there user stil exit || deleted himself
    const user = await UserModel.findOne({ _id: decoded.id })
    if (!user) return next(new AppError('The user is not belong to this token! Please login to get access', 401));


    let mainUser;
    if (user.role === 'admin') mainUser = await UserModel.findById(user.id)
    else mainUser = await UserModel.findById(user.id).populate({ path: 'report' });

    createSendTokenCookie(mainUser, 200, res)
});