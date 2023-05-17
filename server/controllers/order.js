import mongoose from "mongoose";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import dotenv from 'dotenv';
import str from "stripe";
const stripe = str(process.env.STRIPE_SK)

dotenv.config();

export const checkout = async (req, res) => {
    const userId = req.userId;

    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid User');
    const {name, email, city, pincode, address, country, landmark, orders} = req.body;
    try {
        const uniqueIds = [...new Set(orders)];
        const products = await Product.find({_id: {$in:uniqueIds}});


        let items = [];
        for(const productId of uniqueIds){
            const product = products.find((p)=> p._id.toString() === productId);
            const quantity = orders.filter(id=>id===productId)?.length || 0;
            if(quantity > 0){
                items.push({
                    quantity,
                    price_data:{
                        currency: 'INR',
                        product_data: {
                            name: product.title
                        },
                        unit_amount: quantity*product.price*100
                    },
                })
            }
        }

        const order = await Order.create({user: userId, name, email, city, pincode, address, country, landmark, items});
        console.log('order',order);
        
        const session = await stripe.checkout.sessions.create({
            line_items: items,
            mode: 'payment',
            customer_email: email,
            success_url: `http://localhost:3000/cart?success=1&orderId=${order._id}`,
            cancel_url: `http://localhost:3000/cart?canceled=1&orderId=${order._id}`,
            metadata: {
                orderId: order._id
            }
        })
        
        
        return res.status(201).json({
            url:session.url,
            order
        });
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return res.status(500).json({
            error: error.message,
            message: 'Something went wrong.'
        });
    }
}

export const paymentDone = async (req, res) => {
    const userId = req.userId;
    const orderId = req.body.orderId;
    const user = await User.findById(userId);
    await Order.findByIdAndUpdate(orderId, {paymentStatus: true});
    await User.findByIdAndUpdate(userId, {cartItems: [], orders: [...user.orders, orderId]});
    return res.status(201).json({
        orderId,
        message: 'Payment Done.'
    })
}
export const paymentCanceled = async (req, res) => {
    const userId = req.userId;
    const orderId = req.body.orderId;
    // await User.findByIdAndUpdate(userId, {cartItems: [], orders: order._id});
    await Order.findByIdAndDelete(orderId);
    return res.status(201).json({
        message: 'Payment Canceled.'
    })
}