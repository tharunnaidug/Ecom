import user from "../models/user.model.js";
import orderModel from "../models/order.model.js";
import addressModel from "../models/address.model.js";


export const index = (req, res) => {
    res.send("Protected  Page Here")
};
export const profile = async (req, res) => {

    try {
        let username = req.params.username;
        const User = await user.findOne({ username })
        if (!User) return res.status(404).json({ error: "No user found" })

        const address = await addressModel.findOne({ userId: User._id })
        const orders = await orderModel.find({ userId: User._id })

        res.status(200).json({
            id: User._id,
            username: User.username,
            name: User.name,
            phno: User.phno,
            email: User.email,
            address: address,
            orders: orders
        })


    } catch (error) {
        console.log("problem in Getting profile ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};


export const address = async (req, res) => {
    try {
        let userId = req.user._id;
        const add = await addressModel.find({ userId: userId })
        res.status(200).json({ add })
    } catch (error) {
        console.log("problem in Getting address ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};

export const updateAdd = async (req, res) => {
    try {
        const { fullname, addressLine1, addressLine2, city, state, country, pincode, phno } = req.body;
        let userId = req.user._id;
        const add = await addressModel.updateOne({ userId: userId }, { $set: { fullname: fullname, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, country: country, pincode: pincode, phno: Number(phno) } }, { upsert: true })
        res.status(200).json({message:"success", address: add })
    } catch (error) {
        console.log("problem in Updating address ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};
export const allOrder = async (req, res) => {
    try {
        let userId = req.user._id;
        const allOdd = await orderModel.find({ userId: userId })
        res.status(200).json(allOdd)
    } catch (error) {
        console.log("problem in All Order ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};
export const order = async (req, res) => {
    try {
        let orderId = req.user._id;
        const od = await orderModel.findOne({ _id: orderId })
        res.status(200).json(od)
    } catch (error) {
        console.log("problem in Order ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};

export const checkout = async (req, res) => {
    try {
        let userId = req.user._id;
        const { orderItems, address, payment, total } = req.body;
        const newOrder = new orderModel({
            userId: userId,
            items: orderItems,
            address: address,
            payment: payment,
            total: total
        })
        await newOrder.save()

        res.status(200).json({ message: "Order Placed", orderId: newOrder._id })

    } catch (error) {
        console.log("problem in CheckOut ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
};
export const payment = async (req, res) => {
    res.send("Payment  Page Here")
};