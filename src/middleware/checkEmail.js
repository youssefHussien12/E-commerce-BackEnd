import { User } from "../../database/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const checkEmail = async (req, res, next) => {
    let isExist = await User.findOne({ email: req.body.email })
    if (isExist) next(new AppError('user already exist', 409))
    next()
}