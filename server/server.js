require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect DB
mongoose.connect("mongodb://127.0.0.1:27017/queueless")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/token", require("./routes/token"));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API running");
});

app.listen(5000, () => console.log("Server running"));
