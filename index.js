import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
import indexRoutes from './routes/indexRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';
import cartRoutes from "./routes/cartRouts.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from 'cors';

const app = express()
dotenv.config()

mongoose.connect(process.env.DBURL).then(() => { console.log("DB Connected") }).catch((err) => { console.log(err) })


app.use(express.urlencoded({ extended: 'false' }))
app.use(cors({
    "origin": "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.set('view engine', 'html');
app.use(express.json());
app.use('/', indexRoutes)
app.use('/admin', adminRoutes)
app.use('/protected', protectedRoutes)
app.use('/cart', cartRoutes)
app.use('/payment', paymentRoutes)

app.listen(process.env.PORT, () => { console.log(`Listing on Port ${process.env.PORT}`) })