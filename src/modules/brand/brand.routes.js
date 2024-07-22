import { Router } from "express";
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingelFile } from "../../fileUpload/fileUpload.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";


const brandRouter = Router()

brandRouter
    .route("/")
    .post(protectedRoutes,allowedTo("admin"),uploadSingelFile("image",'brands'),addBrand)
    .get(allBrands)
brandRouter
    .route("/:id")
    .get(getBrand)
    .put(protectedRoutes,allowedTo("admin"),uploadSingelFile("image",'brands'),updateBrand)
    .delete(protectedRoutes,allowedTo("admin","mgr"),deleteBrand)

export default brandRouter