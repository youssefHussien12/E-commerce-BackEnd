import { Category } from "../../../database/models/category.model.js"
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne, updateOne } from "../handlers/handlers.js"


const addCategory = catchError(async (req, res) => {
    req.body.slug= slugify(req.body.name)
    if (req.file) req.body.image = req.file.filename
    let category = new Category(req.body)
    await category.save()
    res.status(201).json({ message: "success", category })
})

const allCategories = getAll(Category)

const getCategory = getOne(Category)


const updateCategory = updateOne(Category)

const deleteCategory = deleteOne(Category)


export {
    addCategory,
    allCategories,
    getCategory,
    updateCategory,
    deleteCategory
}