const router = require("express").Router();
const Token = require("../models/Token");

router.post("/generate", async (req, res) => {
  try {
    const { userId } = req.body;

    const lastToken = await Token.findOne().sort({ tokenNumber: -1 });

    let newTokenNumber = 1;
    if (lastToken) {
      newTokenNumber = lastToken.tokenNumber + 1;
    }

    const newToken = await Token.create({
      userId,
      tokenNumber: newTokenNumber
    });

    // 🔥 IMPORTANT PART
    const peopleAhead = await Token.countDocuments({
      tokenNumber: { $lt: newTokenNumber }
    });

    const estimatedTime = peopleAhead * 5;

    res.json({
      tokenNumber: newTokenNumber,
      peopleAhead: peopleAhead,
      estimatedTime: estimatedTime
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Error generating token");
  }
});

module.exports = router;
