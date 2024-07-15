import { AppError } from "../utils/AppError.js"

export function validate(schema) {
    return (req, res, next) => {
        let { error } = schema.validate({ ...req.body, ...req.params, ...req.query, image:req.file }, { abortEarly: false })
        if (!error) {
            next()
        } else {
            let errMsg = error.details.map(err => err.message)
            next(new AppError(errMsg, 400))
        }
    }
}