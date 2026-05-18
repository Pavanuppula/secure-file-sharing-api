// src/routes/fileRoutes.js

const express = require("express");

const router = express.Router();
const File = require("../models/File");

const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
    createFile,
    getFiles,
    getFileById,
    updateFile,
    deleteFile
} = require("../controllers/fileController");

// ADMIN ROUTE
router.get(
    "/admin/all",
    protect,
    admin,
    async (req, res) => {

        const files = await File.find()
            .populate("uploadedBy", "name email");

        res.status(200).json(files);
    }
);

// CREATE FILE + GET FILES
router.route("/")
    .post(protect, createFile)
    .get(protect, getFiles);

// GET SINGLE + UPDATE + DELETE
router.route("/:id")
    .get(protect, getFileById)
    .put(protect, updateFile)
    .delete(protect, deleteFile);

module.exports = router;