import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"


const getAll = (model) => {
    return catchError(async (req, res) => {
        let filter = {};
        if (req.params.category) filter.category = req.params.category
        let apiFeatures = new ApiFeatures(model.find(filter), req.query)
            .pagination().sort().fields().search().filter()
        let document = await apiFeatures.mongooseQuery
        res.status(200).json({ message: "success", page: apiFeatures.pageNumber, data: document })
    })
}


const getOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findById(req.params.id)
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", data: document })
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
            req.body.image = req.file.filename;
        }
        let document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", data: document })

    })
}

const deleteOne = (model) => {
    return catchError(async (req, res, next) => {
        let document = await model.findByIdAndDelete(req.params.id)
        document || next(new AppError("document not found", 404))
        !document || res.status(200).json({ message: "success", data: document })
    })
}



export {
    deleteOne,
    getOne,
    updateOne,
    getAll
}