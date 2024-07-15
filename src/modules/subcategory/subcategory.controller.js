import { SubCategory } from "../../../database/models/subcategory.model.js"
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getOne, updateOne } from "../handlers/handlers.js"



const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name)
  let subCategory = new SubCategory(req.body)
  await subCategory.save()
  res.status(201).json({ message: "success", subCategory })
})

const allSubCategories = catchError(async (req, res) => {
  let pageNumber = req.query.page * 1 || 1
  if (pageNumber < 1) pageNumber = 1
  const limit = 2
  let skip = (parseInt(pageNumber) - 1) * limit
  let filterObj = {};
  if (req.params.category) filterObj.category = req.params.category
  let SubCategories = await SubCategory.find(filterObj).skip(skip).limit(limit).populate("category")
  res.status(200).json({ message: "success", pageNumber, SubCategories })
})

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