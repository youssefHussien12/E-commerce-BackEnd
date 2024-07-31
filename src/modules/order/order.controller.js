import { Cart } from "../../../database/models/cart.model.js"
import { Order } from "../../../database/models/order.model.js"
import { Product } from "../../../database/models/product.model.js"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/AppError.js"
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PiJ5U2L7ssTQmLREkpcz6jG85LwhpoDTwQWbNdXFCsLptw89SEWAuBAjmpiiNf4jw1ZgaG8e65gaZpV5kpOVlpl00hRb6aQtb');

const createCashOrder = catchError(async (req, res, next) => {

    //1-get user cart by cartId
    let cart = await Cart.findById(req.params.id)
    !cart ? next(new AppError("cart not found", 404)) : null

    //2-total order price
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice

    //3-create order
    let order = new Order({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice
    })
    await order.save()

    //4-increment sold & decrement stock
    let options = cart.cartItems.map((prod) => {
        return ({
            updateOne: {
                "filter": { _id: prod.product },
                "update": { $inc: { sold: prod.quantity, stock: -prod.quantity } }
            }
        })
    })
    await Product.bulkWrite(options)

    //5-clear user cart
    await Cart.findByIdAndDelete(cart._id)
    res.status(200).json({ message: "success", order })
})

const getUserOrder = catchError(async (req, res, next) => {
    let orders = await Order.findOne({ user: req.user._id }).populate("orderItems.product")
    res.status(200).json({ message: "success", orders })
})


const getAllOrders = catchError(async (req, res, next) => {
    let orders = await Order.find()
    res.status(200).json({ message: "success", orders })
})



const creatCheckoutSession = catchError(async (req, res, next) => {
    let cart = await Cart.findById(req.params.id)
    !cart ? next(new AppError("cart not found", 404)) : null
    let totalOrderPrice = cart.totalCartPriceAfterDiscount || cart.totalCartPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "egp",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "https://freash-cart-ecommerce.netlify.app/#/allorders",
        cancel_url: "https://freash-cart-ecommerce.netlify.app/#/cart",

        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress
    })

    res.status(200).json({ message: "success", session })
})



export {
    createCashOrder,
    getUserOrder,
    getAllOrders,
    creatCheckoutSession
}

