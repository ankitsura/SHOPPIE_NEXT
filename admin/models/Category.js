import mongoose from 'mongoose';


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    properties: {
        type: [{type:Object}],
        default: []
    }
}, {timestamps: true});

module.exports = mongoose.models.Category || mongoose.model('Category', CategorySchema);


