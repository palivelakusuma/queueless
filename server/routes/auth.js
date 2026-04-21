const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      email: req.body.email,
      password: hashed
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("Error in signup");
  }
});


// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json("Wrong password");

    res.json({ userId: user._id });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error in login");
  }
});

module.exports = router;
