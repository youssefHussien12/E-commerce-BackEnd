import express from 'express'
import { dbConn } from './database/dbConnection.js'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalError } from './src/middleware/globalError.js'
import { AppError } from './src/utils/AppError.js'
import 'dotenv/config'
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51PiJ5U2L7ssTQmLREkpcz6jG85LwhpoDTwQWbNdXFCsLptw89SEWAuBAjmpiiNf4jw1ZgaG8e65gaZpV5kpOVlpl00hRb6aQtb');
import cors from "cors"
import { catchError } from './src/middleware/catchError.js'
import { Cart } from './database/models/cart.model.js'
import { Product } from './database/models/product.model.js'
import { User } from './database/models/user.model.js'
import { Order } from './database/models/order.model.js'
const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.post('/api/webhook', express.raw({ type: 'application/json' }), catchError(async (req, res) => {
    const sig = req.headers['stripe-signature'].toString()
    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_T2DiAj099Qzwu0d8wxD8cTjUqL2MLtd0");
    let checkout;
    if (event.type == "checkout.session.completed") {
        checkout = event.data.object;

        //1-get user cart by cartId
        let cart = await Cart.findById(checkout.client_reference_id)
        !cart ? next(new AppError("cart not found", 404)) : null

        // get user 
        let user = await User.findOne({ email: checkout.customer_email })

        //3-create order
        let order = new Order({
            user: user._id,
            orderItems: cart.cartItems,
            shippingAddress: checkout.metadata,
            totalOrderPrice: checkout.amount_total / 100,
            paymentType: "crad",
            isPaid: true
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
    }
    res.json({ message: "success", checkout });
}));


app.use(express.json())
app.use("/uploads", express.static("uploads"))

bootstrap(app)

app.use('*', (req, res, next) => {
    next(new AppError(` route not found ${req.originalUrl}`, 404))
})


app.use(globalError)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


