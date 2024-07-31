import { catchError } from "../../middleware/catchError.js"
import { deleteOne, getAll, getOne, updateOne } from "../handlers/handlers.js"
import { Coupon } from "../../../database/models/coupon.model.js"
import { AppError } from "../../utils/AppError.js"



const addCoupon = catchError(async (req, res, next) => {
    let isExist = await Coupon.findOne({ code: req.body.code })
    if (isExist) return next(new AppError("coupon exist", 409))
    let coupon = new Coupon(req.body)
    await coupon.save()
    res.status(201).json({ message: "success", coupon })
})

const allCoupons = getAll(Coupon)

const getCoupon = getOne(Coupon)

const updateCoupon = updateOne(Coupon)

const deleteCoupon = deleteOne(Coupon)


export {
    addCoupon,
    allCoupons,
    getCoupon,
    updateCoupon,
    deleteCoupon
}