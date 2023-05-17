import mongoose from 'mongoose';


const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    properties: {
        type: Object
    },
    price: {
        type: Number,
        require: true
    },
    images: {
        type: [String],
        default: [],
    },
    description: {
        type: String,
    },
}, {timestamps: true});

export default mongoose?.models?.Product ||  mongoose.model('Product', ProductSchema);


