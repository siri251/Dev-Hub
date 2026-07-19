const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

router.post('/signup', async  (req, res) => {
    const { name, email, password } = req.body
    const hash =  bcrypt.hashSync(password, 10)
    const user = await User.create({ name, email, password: hash })
    res.json({ message: 'User created successfully', user })
})


router.post("/login", async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
        { userId: user._id },   
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    )
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
        maxAge: 7*24*60*60*1000
    })
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({ message: 'Login successful', userWithoutPassword, token });
})


router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
})

module.exports = router