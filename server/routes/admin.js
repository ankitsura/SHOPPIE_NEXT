import express  from 'express';
import auth from '../middleware/authMiddleware.js';
import { getAllProducts, getAllCategories, editProduct, getProduct, deleteCategory, editCategory, addCategory, addProduct, deleteProduct, getOrders } from '../controllers/admin.js';

const router = express.Router();

// ..........Productss Routes.......... //

router.post('/addProduct', addProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProduct);
router.patch('/editProduct/:id', editProduct);
router.delete('/deleteProduct/:id', deleteProduct);

// ..........Categories Routes.......... //

router.get('/getAllCategories', getAllCategories);
router.delete('/deleteCategory/:id', deleteCategory);
router.put('/editCategory/:id', editCategory);
router.post('/addCategory', addCategory);

// ..........Orders Routes.......... //

router.get('/getOrders', getOrders);




export default router;