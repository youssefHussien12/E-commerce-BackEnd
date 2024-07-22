import { Router } from "express";
import { addSubCategory, allSubCategories, deleteSubCategory, getSubCategory, updateSubCategory } from "./subcategory.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";



const subCategoryRouter = Router({mergeParams:true})

subCategoryRouter
    .route("/")
    .post(protectedRoutes,allowedTo("admin"), addSubCategory)
    .get(allSubCategories)
subCategoryRouter
    .route("/:id")
    .get(getSubCategory)
    .put(protectedRoutes,allowedTo("admin"),updateSubCategory)
    .delete(protectedRoutes,allowedTo("admin"),deleteSubCategory)

export default subCategoryRouter