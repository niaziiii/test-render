const catchAsync = require('../utillties/catchAsync')
const AppError = require('../utillties/appError');

module.exports.deleteOne = Model => {
    return catchAsync(async (
        req, res, next) => {

        const delDocument = await Model.findByIdAndDelete(req.params.id)
        if (!delDocument) return next(new AppError('The Doc isnt found with that id 🔥🔥', 404));

        res.status(204).json({
            status: 204,
            massagess: "data is no more",
            data: delDocument
        })
    })
}

module.exports.getAllDoc = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.find();
        res.status(200).json({
            status: 'success',
            size: doc.length,
            data: doc
        });
    })

module.exports.createOne = Model => {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body)
        res.status(201).json(
            {
                status: "success",
                data: {
                    data: doc
                }
            }
        );

    })
}

module.exports.updateOne = Model => {
    return catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: doc
        })
    })
}
module.exports.getOneDoc = (Model, populateOptions) => {
    return catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (populateOptions) query.populate(populateOptions);
        const doc = await query;

        if (!doc) return next(new AppError('The document isnt found with that id 🔥🔥', 404));

        res.status(200).json({
            status: 'success',
            alldata: doc
        });
    })
}
