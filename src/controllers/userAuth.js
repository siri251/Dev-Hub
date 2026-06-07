import userModel from "../models/userModel";

const bcryptjs = require("bcryptjs")

export const register = async(req, res) => {
    const {name, password, email} = req.body;
    if(!name || !password || !email){
        res.json({sucess: false, message: "Details missing"})
    }
    const user = userModel.findOne({email: email});
    if(user){
        res.json({sucess: false, message: "User already exists"})
    }
    try{
        const hashedPass = bcryptjs.hash(password, 10);
        const mainuser = new userModel({email, password, hashedPass})
        await mainuser.save();
        const token = jwt.sign({id:mainuser._id}, process.env.JWT_SECRET, {expiresIn: '7d'} )
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7*24*60*60*1000
        })
    }catch(error){
        res.json({success: false, message: error.message})
    }

}