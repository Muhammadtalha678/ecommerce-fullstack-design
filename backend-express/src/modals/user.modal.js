import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        verificationToken: { type: String },
        isVerified: { type: Boolean, default: false },
        otpExpiresAt: { type: Date, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        refreshToken: { type: String }
    },
    {
        timestamps:true
    }
)
const UserModal = mongoose.model('users', UserSchema)

export default UserModal