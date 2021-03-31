const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const NotFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const nailDesignRoutes = require("./routes/nailDesignRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const postRoutes = require("./routes/blogPostRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/nailDesigns", nailDesignRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/post", postRoutes);

const _dirname = path.resolve();
app.use("/uploads", express.static(path.join(_dirname, "/uploads")));

// MIDDLEWARE ERROR HANDLER
app.use(NotFound.NotFound);
app.use(errorHandler.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
