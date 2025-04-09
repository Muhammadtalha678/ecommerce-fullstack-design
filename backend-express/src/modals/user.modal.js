import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin','user'],default:'user'}
    },
    {
        timestamps:true
    }
)
const UserModal = mongoose.model('users', UserSchema)

export default UserModal