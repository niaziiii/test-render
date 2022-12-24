const catchAsync = require('../utillties/catchAsync');
const AppError = require('../utillties/appError');
const Report = require('../model/reportModel');
const User = require('../model/userModel');

const mainHandler = require('./mainHandler.js');


module.exports.allReport = mainHandler.getAllDoc(Report);
module.exports.singleReport = mainHandler.getOneDoc(Report);
module.exports.createReport = catchAsync(async (req, res, next) => {

    if (!req.body.user) return next(new AppError('The user id isnt provided', 404));
    const user = await User.findById(req.body.user);

    const userReports = [];
    user.report?.forEach(el => userReports.push(el))

    const formitReport = {
        groupName: req.body.groupName,
        total: req.body.total,
        atemps: req.body.atemps,
        percentage: `${(+req.body.atemps / +req.body.total * 100).toFixed(2)}%`,
        date: Date.now()
    }

    const report = await Report.create(formitReport);
    userReports.push(report.id);

    await User.findByIdAndUpdate(user.id, { report: userReports }, {
        new: true,
        runValidators: true
    })


    res.status(201).json(
        {
            status: "success",
            data: {
                data: report
            }
        }
    );
})
