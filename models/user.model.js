import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    name: { type: String, default: "" },
    phno: { type: Number, default: 0, unique: true },
    gender: { type: String, default: "male" },
    dob: Date,
}, { timestamps: true });

const user = mongoose.model("User", userSchema)
export default user;
