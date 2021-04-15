const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const NotFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const nailDesignRoutes = require("./routes/nailDesignRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const blogPostRoutes = require("./routes/blogPostRoutes");

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/nailDesigns", nailDesignRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/blogPosts", blogPostRoutes);

app.use(cors());

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
