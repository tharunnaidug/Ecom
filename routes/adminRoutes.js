import express from "express"
import verify from "../middleware/isAdmin.js";
import { index, login, logout, updateOrder, updateProduct, updateUser, users, orders, addProduct, delOrder, delProduct, delUser } from '../controllers/admin.controllers.js'
const router = express.Router();

//Get Routes
router.get('/', verify, index);

router.get('/users', verify, users)

router.get('/orders', verify, orders)

router.get('/logout', logout)

// Post Routes
router.post('/login', login);

router.post('/addProduct', verify, addProduct)

router.post('/updateProduct/:pid', verify, updateProduct)

router.post('/updateOrder/:oid', verify, updateOrder)

router.post('/updateUser/:uid', verify, updateUser)

router.post('/delProduct/:pid', verify, delProduct)

router.post('/delOrder/:oid', verify, delOrder)

router.post('/delUser/:uid', verify, delUser)

export default router;