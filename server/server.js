const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// TEMP USERS (no database)
let users = [];

// LOGIN API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ token: "dummy-token" });
});

// SIGNUP API
app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ email, password });

  res.json({ message: "Signup successful" });
});

// TOKEN GENERATE API
let queue = [];

app.post("/api/token/generate", (req, res) => {
  const tokenNumber = queue.length + 1;
  queue.push(tokenNumber);

  res.json({
    token: tokenNumber,
    peopleAhead: queue.length - 1,
    estimatedTime: (queue.length - 1) * 2,
  });
});

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});

// START SERVER
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
