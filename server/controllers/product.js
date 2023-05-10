import Product from "../models/productSchema.js";

    export const getProducts = async (req, res) => {
        try {
                const products = await Product.find().populate('category').sort({createdAt: -1});
                return res.status(201).json(products);
            } catch (error) {
           console.log(error); 
        }
    }
    export const getProductById = async (req, res) => {
        try {
                const pId = req.params.id;
                const product = await Product.findById(pId);
                return res.status(201).json(product);
            } catch (error) {
           console.log(error); 
        }
    }
