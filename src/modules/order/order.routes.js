import { Router } from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { creatCheckoutSession, createCashOrder, getAllOrders, getUserOrder } from "./order.controller.js";


const orderRouter = Router()

orderRouter
    .route("/")
    .get(protectedRoutes, allowedTo("admin"), getAllOrders)
    orderRouter
    .get("/users",protectedRoutes, allowedTo("user"), getUserOrder)
orderRouter
    .route("/:id")
    .post(protectedRoutes, allowedTo("user"), createCashOrder)
    orderRouter
    .post("/checkout/:id",protectedRoutes, allowedTo("user"), creatCheckoutSession)

export default orderRouter