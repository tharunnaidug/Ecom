import express from "express"
import { verify } from "../middleware/isLoggedIn.js";
import { index, checkout, payment, profile, address, allOrder, order, updateAdd } from "../controllers/protected.controllers.js"
const router = express.Router();

// Get Routes
router.get('/', verify, index)

router.get('/profile/:username', verify, profile)

router.get('/address', verify, address)

router.get('/order', verify, allOrder)

router.get('/order/:id', verify, order)

// Post routes
router.post('/checkout', verify, checkout)

router.post('/payment', verify, payment)

router.post('/address/update', verify, updateAdd)


export default router;