import { Router } from "express";
import { addBrand, allBrands, deleteBrand, getBrand, updateBrand } from "./brand.controller.js";
import { uploadSingelFile } from "../../fileUpload/fileUpload.js";


const brandRouter = Router()

brandRouter
    .route("/")
    .post(uploadSingelFile("logo",'brands'),addBrand)
    .get(allBrands)
brandRouter
    .route("/:id")
    .get(getBrand)
    .put(uploadSingelFile("logo",'brands'),updateBrand)
    .delete(deleteBrand)

export default brandRouter