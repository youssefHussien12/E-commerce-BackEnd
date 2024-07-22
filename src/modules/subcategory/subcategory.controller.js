import { SubCategory } from "../../../database/models/subcategory.model.js"
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"



const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name)
  let subCategory = new SubCategory(req.body)
  await subCategory.save()
  res.status(201).json({ message: "success", subCategory })
})



const allSubCategories =getAll(SubCategory)
const getSubCategory = getOne(SubCategory)
const updateSubCategory = updateOne(SubCategory)
const deleteSubCategory = deleteOne(SubCategory)

export {
  addSubCategory,
  allSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory
}