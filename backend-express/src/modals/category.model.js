import mongoose,{Schema} from 'mongoose'

const CategorySchema = new Schema({
    categoryName:{type:String,required:true}
},
    {
        timestamps:true
    }

)

const CategoryModal = mongoose.model('categories', CategorySchema)

export default {CategoryModal}