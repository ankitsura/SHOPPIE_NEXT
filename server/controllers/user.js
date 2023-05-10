import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();  

import User from '../models/userSchema.js';


export const signup = async (req, res) => {
    const {email, password, confirmPassword, name} = req.body;
    
    try {
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message: 'User already exist! Please login'});
        }

        if(password !== confirmPassword){
            return res.status(400).json({message: 'Passwords do not match!'});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name});
        const token = jwt.sign({result}, process.env.JWT_SECRET, {expiresIn:'1h'})        
        return res.status(200).json({result, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: 'Something went wrong.'});
    }

}

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email}); 
        if (!user) {
            return res.status(404).json({message: 'User does not exist!'});
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({message: 'Invalid credentials!'});
        }
        
        const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'} );
        if(!token){
            return res.status(404).json({message: 'No Token'});
        }
        return res.status(200).json({result: user, token});
    } catch (error) {
        return res.status(500).json({message: 'Something went wrong.'});
    }
}