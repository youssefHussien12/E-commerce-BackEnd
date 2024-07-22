import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne} from "../handlers/handlers.js"
import { Review } from "../../../database/models/review.model.js"
import { AppError } from "../../utils/AppError.js"



const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isExist = await Review.findOne({ user: req.user._id, product: req.body.product })
    if (isExist) return next(new AppError('you created a review before', 409))
    let review = new Review(req.body)
    await review.save()
    res.status(201).json({ message: "success", review })
})

const allReviews = getAll(Review)

const getReview = getOne(Review)

const updateReview = catchError(async (req, res, next) => {
    let review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    review || next(new AppError("review not found or you are not created review", 404))
    !review || res.status(200).json({ message: "success", review })
})

const deleteReview = deleteOne(Review)


export {
    addReview,
    allReviews,
    getReview,
    updateReview,
    deleteReview
}