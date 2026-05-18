// src/controllers/fileController.js

const File = require("../models/File");

// CREATE FILE
const createFile = async (req, res) => {

    try {

        const file = await File.create({
            ...req.body,
            uploadedBy: req.user._id
        });

        res.status(201).json(file);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL FILES WITH SEARCH + PAGINATION
const getFiles = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {
            uploadedBy: req.user._id,
            fileName: {
                $regex: search,
                $options: "i"
            }
        };

        const files = await File.find(query)
            .skip(skip)
            .limit(limit);

        const total = await File.countDocuments(query);

        res.status(200).json({
            total,
            page,
            limit,
            files
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// GET SINGLE FILE
const getFileById = async (req, res) => {

    try {

        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "File Not Found"
            });
        }

        res.status(200).json(file);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE FILE
const updateFile = async (req, res) => {

    try {

        const file = await File.findById(req.params.id);

        if (!file) {
            return res.status(404).json({
                message: "File Not Found"
            });
        }

        // OWNER CHECK
        if (file.uploadedBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedFile);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE FILE
const deleteFile = async (req, res) => {

    try {

        const file = await File.findById(req.params.id);

        if (!file) {

            return res.status(404).json({
                message: "File Not Found"
            });
        }

        // OWNER CHECK
        if (file.uploadedBy.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Access Denied"
            });
        }

        await file.deleteOne();

        res.status(200).json({
            message: "File Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createFile,
    getFiles,
    getFileById,
    updateFile,
    deleteFile
};