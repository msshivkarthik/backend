const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const {verifyToken} = require('../middleware/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const  userExists = await User.findOne({ email });
        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password:hasedPassword });
        await user.save();

        const token=jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ email:user.email,token:token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const {email,password} = req.body;

    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:'Invalid email'});
        }
        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:'Invalid password'});
        }

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).json({email:user.email,token:token});
        console.log('User logged in');
    }catch(error){
        res.status(500).json({error:'Server error'});

    }
});

module.exports = router;