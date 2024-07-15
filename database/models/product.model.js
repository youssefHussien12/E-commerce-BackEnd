import { model, Schema, Types } from "mongoose";



const schema = new Schema({
    title:{
        type:String,
        unique:[true , "name is requierd"],
        trim:true,
        required:true,
        minLength:[2,'too short category name']    
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    description:{
        type:String,
        required:true,
        minLength:30,
        maxLength:2000
    },
    imageCover:String,
    images:[String],
    
    price:{
        type:Number,
        required:true,
        min:0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:0
    },
    sold:Number,
    stock:{
        type:Number,
        min:0
    },
   category:{
    type:Types.ObjectId,
    ref:"Category"
   },
   Subcategory:{
    type:Types.ObjectId,
    ref:"SubCategory"
   },
   brand:{
    type:Types.ObjectId,
    ref:"Brand"
   },
   rateAvg:{
    type:Number,
    min:0,
    max:5
   },
   rateCount:Number,
   createdBy:{
    type:Types.ObjectId,
    ref:"User"
}
},{timestamps:true , versionKey:false})


schema.post('init',function(doc){
    doc.imageCover = "http://localhost:3000/uploads/products/" + doc.imageCover
    doc.images = doc.images.map(img=>"http://localhost:3000/uploads/products/" + img)
})

export const Product = model('Product',schema)