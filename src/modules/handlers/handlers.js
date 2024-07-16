import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"



const deleteOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", document })
    })
}

const getOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findById(req.params.id)
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", document })
    })
}

const getAll = (model) => {
    return catchError(async (req, res) => {
        let apiFeatures = new ApiFeatures(model.find(), req.query)
        .pagination().sort().fields().search().filter()
        let products = await apiFeatures.mongooseQuery
        res.status(200).json({ message: "success", page: apiFeatures.pageNumber, products })
    })
}

const updateOne = (model) => {
    return catchError(async (req, res, next) => {
        if (req.body.name) {
            req.body.slug = slugify(req.body.name);
        }
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        if (req.file) {
            req.body.logo = req.file.filename;
            req.body.image = req.file.filename;
        }
        let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", document })
    })

}

export {
    deleteOne,
    getOne,
    updateOne,
    getAll
}