import { Router } from "express";
import {addReview,getReview,allReviews,updateReview,deleteReview} from "./review.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const reviewRouter = Router()

reviewRouter
    .route("/")
    .post(protectedRoutes,allowedTo("user"),addReview)
    .get(allReviews)
reviewRouter
    .route("/:id")
    .get(getReview)
    .put(protectedRoutes,allowedTo("user"),updateReview)
    .delete(protectedRoutes,allowedTo("admin","user"),deleteReview)

export default reviewRouter