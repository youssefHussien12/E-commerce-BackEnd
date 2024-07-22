import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWishList, getLoggedUserWishList, removeFromWishList } from "./wishlist.controller.js";


const wishlistRouter = Router()

wishlistRouter
    .route("/")
    .patch(protectedRoutes, allowedTo("user"), addToWishList)
    .get(protectedRoutes, allowedTo("user"), getLoggedUserWishList)
wishlistRouter
    .route("/:id")
    .delete(protectedRoutes, allowedTo("user", "admin"), removeFromWishList)

export default wishlistRouter