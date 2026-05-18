// src/routes/authRoutes.js

const express = require("express");

const router = express.Router();

const { body } = require("express-validator");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

// REGISTER
router.post(
    "/register",

    [
        body("name").notEmpty().withMessage("Name is required"),

        body("email")
            .isEmail()
            .withMessage("Valid email required"),

        body("password")
            .isLength({ min: 6 })
            .withMessage("Password minimum 6 characters")
    ],

    registerUser
);

// LOGIN
router.post("/login", loginUser);

module.exports = router;