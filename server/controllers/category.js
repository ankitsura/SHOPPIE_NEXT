import Category from "../models/categorySchema.js";

    export const getCategories = async (req, res) => {
        try {
                const categories = await Category.find();
                return res.status(201).json(categories);
            } catch (error) {
           console.log(error); 
        }
    }
