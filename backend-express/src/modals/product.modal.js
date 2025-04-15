import mongoose, { Schema } from 'mongoose'

const ProductSchema = new Schema({
    name:{type:String,required: true},
    price:{type:String,required: true},
    bannerImage:{type:String,required: true},
    detailImages:[{type:String}],
    description:{type:String,required: true},
    category:{type:String,required: true},
    stock:{type:String,required: true},
},
    {
        timestamps:true
    }
)

const ProductModal = mongoose.model('products', ProductSchema)

export default ProductModal