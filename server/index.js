import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/products.js'; 
import categoryRoutes from './routes/categories.js'; 
import userRoutes from './routes/users.js'; 

const app = express();
dotenv.config(); 
const PORT = process.env.PORT || 5000;  
const CONNECTION_URL = process.env.CONNECTION_URL;  

mongoose.set('strictQuery', false);
app.use(cors());

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.use('/products', productRoutes);  
app.use('/categories', categoryRoutes);  
app.use('/user', userRoutes);  


mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

