import mongoose from "mongoose";
import Category from "../models/categorySchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";

export const addProduct = async (req, res) => {
    const data = req.body
    try {
        const newProduct = await Product.create(data);
        return res.status(201).json(newProduct);
    } catch (error) {
    console.log(error);
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({createdAt: -1});
        return res.status(201).json(products);
    } catch (error) {
    console.log(error);
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('category');
        return res.status(201).json(product);
    } catch (error) {
    console.log(error);
    }
}

export const editProduct = async (req, res) => {
    const data = req.body
    try {
        console.log('data',data);
        await Product.findByIdAndUpdate(req.params.id, data, {new: true});
        return res.status(201).json({
            message: 'Product updated'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProduct = async (req, res) => {
    const data = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send('Invalid User');

        await Product.findByIdAndDelete(req.params.id);
        return res.status(201).json({
            message: 'Product updated'
        });
    } catch (error) {Category
        console.log(error.message);
    }
}
    
    
    // ................Categories API................ //
    
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parentCategory').sort({createdAt: -1});
        return res.status(201).json(categories);
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = async (req, res) => {
    try {
        const {name, parentCategory, properties} = req.body;
        const nameWithoutSpaces = name.replace(/\s+/g, '');
        const alreadyExist = await Category.findOne({name: new RegExp(`^${nameWithoutSpaces}$`, 'i')} );
        if(alreadyExist) return res.json('category already exist');
        const comaSeparated = properties.map((p)=>({
            name: p.name,
            values: p.values.split(',')
        }));
        const data = {
            name,
            properties: comaSeparated,
            parentCategory: parentCategory || undefined
        }
        const category = await Category.create(data);
        return res.json(category);
    } catch (error) {
        console.log(error);
    }
}

export const editCategory = async (req, res) => {
    const {name, parentCategory, properties} = req.body;
    try {
        const comaSeparated = properties.map((p)=>{
            if(Array.isArray(p.values)){
                return ({name: p.name,
                values: p.values})
            }else{
                return ({name: p.name,
                values: p.values.split(',')})
            }
        });
        const data = {
            name,
            properties: comaSeparated,
            parentCategory
        }
        const category = await Category.findByIdAndUpdate(req.params.id, data);
        return res.json(category);
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await Category.findByIdAndDelete(id);            
        return res.status(201).json({
            message: 'Category Deleted'
        });
    } catch (error) {
        console.log(error.message);            
    }
}


// ................Orders API................ //

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').sort({createdAt: -1});
        return res.status(201).json(orders);
    } catch (error) {
        console.log(error);
    }
}










//     if(method === 'POST'){
//         const {name, parentCategory, properties} = req.body;
//         const nameWithoutSpaces = name.replace(/\s+/g, '');
//         const alreadyExist = await Category.findOne({name: new RegExp(`^${nameWithoutSpaces}$`, 'i')} );
//         if(alreadyExist) return res.json('category already exist');
//         const comaSeparated = properties.map((p)=>({
//             name: p.name,
//             values: p.values.split(',')
//         }));
//         const data = {
//             name,
//             properties: comaSeparated,
//             parentCategory: parentCategory || undefined
//         }
//             const category = await Category.create(data);
//             return res.json(category);
//     }
//     if(method === 'PUT'){
//         const {name, parentCategory, properties, id} = req.body;
//         console.log(properties);
//         const comaSeparated = properties.map((p)=>{
//             if(Array.isArray(p.values)){
//                 return ({name: p.name,
//                 values: p.values})
//             }else{
//                 return ({name: p.name,
//                 values: p.values.split(',')})
//             }
//         });
//         const data = {
//             name,
//             properties: comaSeparated,
//             parentCategory: parentCategory || undefined
//         }
//         const category = await Category.findByIdAndUpdate(id, data);
//         return res.json(category);
//     }
//     if(method === 'DELETE'){
//         const id = req.query.id;
//         await Category.findByIdAndDelete(id);
//         return res.json('Deleted Successfully');
//     }
// } catch (error) {
//     console.log(error);
// }
