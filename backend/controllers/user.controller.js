const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("../models/user.models.js");

dotenv.config();
const JWT_SECRETS = process.env.JWT_SECRET;

const signup = async (req, res) => {
    try{
        const {name, email, password, username} = req.body;

        if(!name || !email || !password || !username) return res.status(400).json({message: "All fields are required"});

        const user = await User.findOne({
            email
        });

        if(user) return res.status(400).json({message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            username
        });

        // await newUser.save();

        const token = jwt.sign({ id: newUser._id}, JWT_SECRETS);
        newUser.token = token;
        await newUser.save();

        return res.json({
            message: "User Created",
            token
        });

    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const response = await User.findOne({
            email:email
        })
        if(!response){
            res.status(401).send({
                Message:"Your email is not correct"
            })
        };

        const passwordmatch = await bcrypt.compare(password,response.password);

        if(passwordmatch){
            const token = jwt.sign({ id: response._id}, JWT_SECRETS);
            console.log(token);
            response.token = token;
            await response.save();
            res.json({
                token
            })
        }
        else{
    
            res.status(401).send({
                Message:"Incorrect Password"
            })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signup, login };
