
import Joi from "joi"

const addSubCategoryVal = Joi.object({
    name: Joi.string().min(1).required(),
    category: Joi.string().hex().length(24).required()
})

export {
    addSubCategoryVal
}