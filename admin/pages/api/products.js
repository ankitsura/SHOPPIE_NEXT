import mongooseConnect from "@/lib/mongoose";
import Product from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res){
    const {method} = req;
    const {title, category, price, description, images, properties} = req.body;
    const data = {
        title, 
        category: category || undefined, 
        price, 
        description, 
        images,
        properties
    }

    try {
        await mongooseConnect();
        
        await isAdminRequest(req, res);

        if(method === 'POST'){
            console.log(data);
            const newProduct = await Product.create(data);
            return res.status(201).json(newProduct);
        } 
        if(method === 'DELETE'){
            if(req.query?.id){
                await Product.findByIdAndDelete(req.query.id);
                return res.status(201).json({
                    message: 'Product deleted!'
                });
            }
        } 
        if(method === 'PATCH'){
            await Product.findByIdAndUpdate(req.query.id, data);
            return res.status(201).json({
                message: 'Product updated'
            });
        } 
        if(method === 'GET'){
            if(req?.query?.id){
                const product = await Product.findById(req.query.id).populate('category');
                return res.status(201).json(product);
            }
            const products = await Product.find().populate('category').sort({createdAt: -1});
            return res.status(201).json(products);
        } 
    } catch (error) {
       console.log(error); 
    }
}
