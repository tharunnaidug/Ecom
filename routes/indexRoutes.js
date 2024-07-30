import express from "express"
import { index, register, login, logout, product, allProducts } from '../controllers/index.controllers.js'

const router = express.Router();

router.get('/', index)

router.post('/register', register)

router.post('/login', login)

router.get('/logout', logout)

router.get('/product', allProducts)

router.get('/product/:id', product)

export default router;