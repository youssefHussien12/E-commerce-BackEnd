import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCoupon, allCoupons, deleteCoupon, getCoupon, updateCoupon } from "./coupon.controller.js";


const couponRoter = Router()
couponRoter.use(protectedRoutes, allowedTo("admin"))
couponRoter
    .route("/")
    .post(addCoupon)
    .get(allCoupons)
couponRoter
    .route("/:id")
    .get(getCoupon)
    .put(updateCoupon)
    .delete(deleteCoupon)

export default couponRoter