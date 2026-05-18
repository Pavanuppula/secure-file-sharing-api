// src/controllers/authController.js

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator");

// REGISTER
const registerUser = async (req, res) => {

    try {

        // VALIDATION
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({
                errors: errors.array()
            });
        }

        // GET DATA
        const { name, email, password, role } = req.body;

        // CHECK USER
        const userExists = await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// LOGIN
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // CHECK USER
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email"
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // GENERATE TOKEN
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser
};