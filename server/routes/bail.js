const express = require('express');
const router = express.Router();
const { calculateBailEligibility } = require('../utils/bailCalculator');

router.post('/', (req, res) => {
  const { name, arrestDate, section, isFirstOffence, isCapitalOffence, state } = req.body;

  const result = calculateBailEligibility({
    arrestDate,
    section,
    isFirstOffence: isFirstOffence !== false,
    isCapitalOffence: isCapitalOffence === true
  });

  res.json({
    ...result,
    name,
    section: section,
    state,
    disclaimer: "This is a preliminary calculator. The final court decision may vary. Please consult a lawyer.",
    nalsa: "NALSA Helpline: 15100"
  });
});

module.exports = router;
