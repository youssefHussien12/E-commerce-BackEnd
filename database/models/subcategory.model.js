import { model, Schema, Types } from "mongoose";



const schema = new Schema({
    name: {
        type: String,
        unique: [true, "name is requierd"],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    category: {
        type: Types.ObjectId,
        ref: "Category"
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false })

schema.pre(/^find/, function () {
    this.populate("category")
})


export const SubCategory = model('SubCategory', schema)