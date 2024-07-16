import { SubCategory } from "../../../database/models/subcategory.model.js"
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getOne, updateOne } from "../handlers/handlers.js"
import { ApiFeatures } from "../../utils/apiFeatures.js"



const addSubCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name)
  let subCategory = new SubCategory(req.body)
  await subCategory.save()
  res.status(201).json({ message: "success", subCategory })
})

const allSubCategories = catchError(async (req, res) => {
  let filter = {};
  if (req.params.category) filter.category = req.params.category  

  let apiFeatures = new ApiFeatures(SubCategory.find(filter),req.query)
  .pagination().sort().fields().search().filter() 

  let subCategories = await apiFeatures.mongooseQuery.populate("category")
  res.status(200).json({ message: "success", page: apiFeatures.pageNumber, subCategories })
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