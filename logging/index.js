const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const logRoutes = require("./routes/logRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/log", logRoutes);
app.use("/test", (req, res) => res.send("Working"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log("Logger Service running on port", process.env.PORT);
  }))
  .catch((err) => console.error("MongoDB connection error:", err));
