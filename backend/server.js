const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const NotFound = require("./middleware/errorMiddleware");
const errorHandler = require("./middleware/errorMiddleware");
const nailDesignRoutes = require("./routes/nailDesignRoutes");

dotenv.config();
connectDB();

const app = express();

app.use("/api/nailDesigns", nailDesignRoutes);

// MIDDLEWARE ERROR HANDLER
app.use(NotFound.NotFound);

app.use(errorHandler.errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
