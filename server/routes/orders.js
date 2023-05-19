import express  from 'express';
import auth from '../middleware/authMiddleware.js';
import { checkout, paymentDone, paymentCanceled } from '../controllers/order.js';

const router = express.Router();

router.post('/checkout', auth, checkout);
router.post('/paymentDone', auth, paymentDone);
router.post('/paymentCanceled', auth, paymentCanceled);



export default router;