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
    image: String,
    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true, versionKey: false })


schema.post('init', function (doc) {
    if (doc.image) doc.image = process.env.BASE_URL + "brands/" + doc.image
})


export const Brand = model('Brand', schema)