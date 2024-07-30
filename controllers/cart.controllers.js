import cartModel from "../models/cart.model.js"

export const show = async (req, res) => {
    try {
        let userId = req.user._id;
        const cart = await cartModel.findOne({ userId: userId })

        res.status(200).json({ message: "success", cart: cart })

    } catch (error) {
        console.log("problem in Show cart ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const add = async (req, res) => {
    try {
        let userId = req.user._id;
        const { productId, title, price, qty, imgScr } = req.body;

        const cart = await cartModel.findOne({ userId: userId })

        if (cart.items.length > 0) {
            for (let i = 0; i < cart.items.length; i++) {
                if (cart.items[i].productId == productId) {
                    cart.items[i].qty++
                    await cart.save()
                    return res.status(200).json({ message: "success", cart: cart })
                }
            }
        }
        // console.log(productId, title, price, qty, imgScr)
        cart?.items?.push({ productId: productId, title: title, price: price, qty: qty, imgSrc: imgScr })

        await cart.save()

        res.status(200).json({ message: "success", cart: cart })
    } catch (error) {
        console.log("problem in Add cart ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}
export const update = async (req, res) => {
    try {
        let userId = req.user._id;
        const { productId, qty } = req.body;

        // console.log(productId, qty)
        const cart = await cartModel.findOne({ userId: userId });

        if (cart.items.length > 0) {
            if (qty == 10000) {
                for (let i = 0; i < cart.items.length; i++) {

                    // console.log(cart.items[i].productId, productId)

                    if (cart.items[i].productId == productId) {
                        cart.items.splice(i, 1)
                        await cart.save()
                        return res.status(200).json({ message: "success", cart: cart })
                    }
                }
                
                return res.status(304).json({ message: "There was Some Problem", cart: cart })
            }



            for (let i = 0; i < cart.items.length; i++) {

                if (cart.items[i].productId == productId) {
                    cart.items[i].qty--;
                    await cart.save()

                    if (cart.items[i].qty == 1 ||cart.items[i].qty == 0) {
                        console.log(cart.items[i].productId, productId, inside)
                        //remove the product
                        cart.items.splice(i, 1)
                        await cart.save()
                        return res.status(200).json({ message: "success", cart: cart })
                    }
                    return res.status(200).json({ message: "success", cart: cart })
                }
            }
        }

        res.status(200).json({ message: "Product Not Found", cart: cart })
    } catch (error) {
        console.log("problem in Update cart ", error)
        res.status(500).json({ error: "Internal Server Error" })

    }
}
export const updateQty = async (req, res) => {
    try {
        let userId = req.user._id;
        const { productId, qty } = req.body;

        // console.log(productId, qty)
        const cart = await cartModel.findOne({ userId: userId });

        if (cart.items.length > 0) {



            for (let i = 0; i < cart.items.length; i++) {

                if (cart.items[i].productId == productId) {
                    cart.items[i].qty++;
                    await cart.save()
                    return res.status(200).json({ message: "success", cart: cart })
                }
            }
        }

        res.status(200).json({ message: "Product Not Found", cart: cart })
    } catch (error) {
        console.log("problem in Update cart ", error)
        res.status(500).json({ error: "Internal Server Error" })

    }
}
export const clear = async (req, res) => {
    try {
        let userId = req.user._id;

        const cart = await cartModel.findOne({ userId: userId })
        cart.items = []
        await cart?.save()

        res.status(200).json({ message: "success" })
    } catch (error) {
        console.log("problem in clear cart ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}