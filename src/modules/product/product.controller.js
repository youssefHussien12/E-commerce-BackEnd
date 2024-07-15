import { Product } from "../../../database/models/product.model.js"
import slugify from "slugify"
import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getOne, updateOne } from "../handlers/handlers.js"



const addProduct = catchError(async (req, res) => {
    req.body.slug = slugify(req.body.title)
    req.body.imageCover = req.files.imageCover[0].filename
    req.body.images = req.files.images.map(img => img.filename)
    let product = new Product(req.body)
    await product.save()
    res.status(201).json({ message: "success", product })
})

const allProducts = catchError(async (req, res) => {
    let pageNumber = req.query.page * 1 || 1
    if (pageNumber < 1) pageNumber = 1
    const limit = 2
    let skip = (parseInt(pageNumber) - 1) * limit
    let Products = await Product.find().skip(skip).limit(limit)
        .populate("category")
        .populate("Subcategory")
        .populate("brand")
    res.status(200).json({ message: "success",pageNumber, Products })
})

const getProduct = getOne(Product)

const updateProduct = updateOne(Product)

const deleteProduct = deleteOne(Product)

export {
    addProduct,
    allProducts,
    getProduct,
    updateProduct,
    deleteProduct
}