import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: {
        type: Object,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pincode: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    landmark: {
        type: String,
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});

export default mongoose?.models?.Order ||  mongoose.model('Order', OrderSchema);


