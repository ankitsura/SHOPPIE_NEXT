import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        default: null
    },
    cartItems: {
        type: [String],
        default: [],
    },
    wishlist: {
        type: [String],
        default: [],
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

export default mongoose.model('User', UserSchema);