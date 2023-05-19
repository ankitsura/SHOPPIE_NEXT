import express  from 'express';
import { getProductById, getProducts, getCartItems, addToCart, removeFromCart, getFeaturedProducts } from '../controllers/product.js';
import auth from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', getProducts);
router.get('/featuredProducts', getFeaturedProducts);
router.get('/cartItems/:items', auth, getCartItems);
router.get('/:id', getProductById);
router.post('/addtocart/:id', auth, addToCart);
router.post('/removefromcart/:id', auth, removeFromCart);

export default router;
