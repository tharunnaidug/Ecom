import genarateJwtToken from "../utils/genarateJwt.js";
import user from "../models/user.model.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";

export const index = (req, res) => {
    res.json({ message: "Welcome Admin" })
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(500).json({ error: "No Username and Password " })

        if (username != process.env.AUSER) return res.status(500).json({ error: "Invaild Admin Username  " })
        if (password != process.env.APASS) return res.status(500).json({ error: "Invaild Admin Password  " })

        let token = await genarateJwtToken(username, res)
        res.status(200).json({ username: username, token: token })

    } catch (error) {
        console.log("problem in  admin login ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const logout = async (req, res) => {
    res.clearCookie("jwt").json({ message: "loggedout" })
}

// Users Routes
export const users = async (req, res) => {
    try {
        const users = await user.find()

        res.status(200).json({ message: "success", users: users })

    } catch (error) {
        console.log("problem in All Users ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateUser = async (req, res) => {
    try {
        let userId = req.params.uid;
        const { username, email, name, phno, gender } = req.body;

        const updatedUser = await user.updateOne({ _id: userId }, { $set: { username: username, email: email, name: name, phno: phno, gender: gender } })

        res.status(200).json({ message: "success", user: updatedUser })
    } catch (error) {
        console.log("problem in Update Users ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const delUser = async (req, res) => {
    try {
        let userId = req.params.uid;

        const delus = await user.deleteOne({ _id: userId })

        res.status(200).json({ message: "success", user: delus })

    } catch (error) {
        console.log("problem in delete Users ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

//Orders Routes
export const orders = async (req, res) => {
    try {
        const allOd = await orderModel.find()

        res.status(200).json({ message: "success", orders: allOd })

    } catch (error) {
        console.log("problem in All orders ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateOrder = async (req, res) => {
    try {
        let oId = req.params.oid;
        const { status, total, payment, items } = req.body;

        const upO = await orderModel.updateOne({ _id: oId }, { $set: { items: items, payment: payment, total: total, status: status } })

        res.status(200).json({ message: "success", updateOrder: upO })

    } catch (error) {
        console.log("problem in update orders", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const delOrder = async (req, res) => {
    try {
        let oId = req.params.oid;

        const delOd = await orderModel.deleteOne({ _id: oId })

        res.status(200).json({ message: "success", delOrder: delOd })
    } catch (error) {
        console.log("problem in delete order ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

// Product Routes
export const addProduct = async (req, res) => {
    try {
        const { title, description, category, price, qty, imgScr } = req.body;

        const newProduct = new productModel({ title: title, description: description, category: category, price: price, qty: qty, imgSrc: imgScr })
        await newProduct.save();

        res.status(200).json({ message: "success", product: newProduct })
    } catch (error) {
        console.log("problem in add products ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        let pId = req.params.pid;
        const { title, description, category, price, qty, imgScr } = req.body;

        const upPro = await productModel.updateOne({ _id: pId }, { $set: { title: title, description: description, category: category, price: price, qty: qty, imgSrc: imgScr } })

        res.status(200).json({ message: "success", product: upPro })
    } catch (error) {
        console.log("problem in update products ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const delProduct = async (req, res) => {
    try {
        let pId = req.params.pid;

        const delP = await productModel.deleteOne({ _id: pId })

        res.status(200).json({ message: "success", product: delP })
    } catch (error) {
        console.log("problem in delete product ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}