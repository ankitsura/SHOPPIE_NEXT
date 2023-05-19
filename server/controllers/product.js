import mongoose from "mongoose";
import Product from "../models/productSchema.js";
import User from '../models/userSchema.js';

    export const getProducts = async (req, res) => {
        try {
            const products = await Product.aggregate([{ $sample: { size: 40 } }]);
            await Product.populate(products, {path: "category"});
                return res.status(201).json(products);
            } catch (error) {
           console.log(error); 
        }
    }
    
    export const getFeaturedProducts = async (req, res) => {
        try {
                const products = await Product.find().limit(10).sort({createdAt: -1});
                return res.status(201).json(products);
            } catch (error) {
           console.log(error); 
        }
    }

    export const getProductById = async (req, res) => {
        try {
                const pId = req.params.id.toString();
                const product = await Product
                .findById(pId)
                .populate({
                    path: 'category',
                    populate: {
                        path: 'parentCategory',
                        model: 'Category'
                    }
                });
                return res.status(201).json(product);
            } catch (error) {
           console.log(error); 
        }
    }
    export const getCartItems = async (req, res) => {
        const userId = req.userId
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid User');

        const items = req.params.items.split(',');
        try {
            const products = await Product.find({'_id': {$in: items}}).populate('category');
            return res.status(200).json(products)
            } catch (error) {
           console.log(error); 
        }
    }


    export const addToCart = async (req, res) => {
        const productId = req.params.id;
        const userId = req.userId

        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid User');

        const product = await Product.findById(productId);
        if(!product || !mongoose.Types.ObjectId.isValid(productId)){
            return res.status(200).send('Product not found');
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json('Please Login first')
        }

        user.cartItems.push(productId);
        await user.save();
        return res.status(200).json(productId);
    }
    

    export const removeFromCart = async (req, res) => {
        const productId = req.params.id;
        const userId = req.userId
        if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid User');
        try {
            const user = await User.findById(userId);
            if(!user){
                return res.status(404).json('Please Login first')
            }
    
            const index = user.cartItems.indexOf(productId);
            if (index > -1) {
                user.cartItems.splice(index, 1);
            }
            await user.save();
            return res.status(200).json(productId);
            
        } catch (error) {
            console.log(error);
        }
    }
