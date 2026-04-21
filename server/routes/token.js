const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

// Generate Token
router.post("/generate", async (req, res) => {
  try {
    // count existing tokens
    const count = await Token.countDocuments();

    const newToken = new Token({
      tokenNumber: count + 1,
    });

    await newToken.save();

    const peopleAhead = count;
    const estimatedTime = peopleAhead * 5;

    res.json({
      tokenNumber: newToken.tokenNumber,
      peopleAhead,
      estimatedTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error generating token" });
  }
});

module.exports = router;
