const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const NotFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const nailDesignRoutes = require("./routes/nailDesignRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/nailDesigns", nailDesignRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// MIDDLEWARE ERROR HANDLER
app.use(NotFound.NotFound);
app.use(errorHandler.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
