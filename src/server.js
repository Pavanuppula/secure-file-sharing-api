// src/server.js

const express = require("express");

const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const fileRoutes = require("./routes/fileRoutes");

const errorHandler = require("./middleware/errorMiddleware");

// LOAD ENV
dotenv.config();

// CONNECT DATABASE
connectDB();

const app = express();

// MIDDLEWARE
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
    res.send("API Running");
});

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/files", fileRoutes);

// ERROR HANDLER
app.use(errorHandler);

// PORT
const PORT = process.env.PORT || 5000;

// START SERVER
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});