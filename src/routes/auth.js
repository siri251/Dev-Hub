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
    res.json({ message: 'Login successful', user, token });
})


router.post('/logout', (req, res) => {
    res.json({ message: 'Logout successful' });
})

module.exports = router