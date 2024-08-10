import { model, Schema, Types } from "mongoose";
import { paymentType } from "../../src/utils/common/enum.js";

const schema = new Schema({

    user: { type: Types.ObjectId, ref: "User" },
    orderItems: [
        {
            product: { type: Types.ObjectId, ref: "Product" },
            quantity: Number,
            price: Number
        }
    ],
    totalOrderPrice: Number,
    shippingAddress: {
        city: String,
        street: String,
        phone: String
    },
    paymentType: {
        type: String,
        enum: Object.values(paymentType),
        default: paymentType.CASH
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date
}, { timestamps: true, versionKey: false })


export const Order = model('Order', schema)