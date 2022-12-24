const catchAsync = require('../utillties/catchAsync');
const AppError = require('../utillties/appError');
const mainHandler = require('./mainHandler.js');
const Questions = require('../model/questionsModel');
const Groups = require('../model/groupModel');


module.exports.createGroup = mainHandler.createOne(Groups);
module.exports.allGroup = mainHandler.getAllDoc(Groups);
module.exports.getOneGroup = mainHandler.getOneDoc(Groups, { path: 'questions' });

module.exports.getAllQuestion = mainHandler.getAllDoc(Questions);
module.exports.getOneQuestion = mainHandler.getOneDoc(Questions);

module.exports.createQuestion = catchAsync(async (req, res, next) => {
    const groupsQuestions = [];
    if (!req.body.group) return next(new AppError('The Question group isnt provided', 404));
    const group = await Groups.findById(req.body.group);
    group.questions.forEach(el => groupsQuestions.push(el))

    let q = {
        title: req.body.title,
        correct: req.body.correct,
        options: [...req.body.options]
    }


    const question = await Questions.create(q)
    groupsQuestions.push(question.id);

    const data = {
        questions: groupsQuestions
    }

    await Groups.findByIdAndUpdate(req.body.group, data, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status: "success",
        data: question
    })
})

