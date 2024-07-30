import orderModel from "../models/order.model.js";
import payment from "../models/payment.js";
/*
import Razorpay from 'razorpay'

var instance = new Razorpay({ key_id: process.env.KEYID, key_secret: process.env.SECRET })

export const checkout = async (req, res) => {
    const { amount, shippingAddress, userId, items } = req.body;
    var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `rececipt ${Date.now()}`
    };
    const order = instance.orders.create(options);

    res.json({ orderId: (await order).id, amount, shippingAddress, userId, items, paymnetStatus: "created" })
}

export const verifyPayment = async (req, res) => {
    const { orderId, paymentId, userId, shippingAddress, amount, items, signature } = req.body;
    
    let confirm = await payment.create({
        orderId, paymentId, signature, amount, shippingAddress, userId, items, paymnetStatus: "paid"
    })
    
    res.json({ message: "success", confirm })
} 
*/
export const ordercheckout = async (req, res) =>{
    const { total, address,payment, items } = req.body;
    console.log( total, address,payment, items )
    let userId = req.user._id;
     const order=new orderModel({
       userId:userId,
       items:items,
       address:address,
       payment:payment,
       total:total
     })
    await order.save()
    // console.log(order)

    res.send({message:"success",order:order})
}