import  Express  from "express";
import { verify } from "../middleware/isLoggedIn.js";
// import { checkout, ordercheckout, verifyPayment } from "../controllers/payment.controllers.js";
import {  ordercheckout } from "../controllers/payment.controllers.js";

const router=Express.Router();

// router.post(`/checkout`,verify,checkout)
// router.post(`/verify`,verify,verifyPayment)

router.post(`/ordercheckout`,verify,ordercheckout)


export default router