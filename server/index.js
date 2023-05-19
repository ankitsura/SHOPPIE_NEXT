import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js'; 
import categoryRoutes from './routes/categories.js'; 
import userRoutes from './routes/users.js'; 
import orderRoutes from './routes/orders.js'; 
import adminRoutes from './routes/admin.js'; 

const app = express();
dotenv.config(); 
const PORT = process.env.PORT || 5000;  
const CONNECTION_URL = process.env.CONNECTION_URL; 

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

mongoose.set('strictQuery', false);
app.use(cors());

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/products', productRoutes);  
app.use('/categories', categoryRoutes);  
app.use('/user', userRoutes);  
app.use('/order', orderRoutes);  

// Admin Routes
app.use('/admin', adminRoutes);  



mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

 