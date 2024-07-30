import express from "express"
import { verify } from "../middleware/isLoggedIn.js";
import { show, add, update, updateQty,clear } from "../controllers/cart.controllers.js"

const router = express.Router();

router.get('/', verify, show)

router.post('/add', verify, add)

router.post('/update', verify, update)

router.post('/updateQty', verify, updateQty)

router.get('/clear', verify, clear)



export default router;