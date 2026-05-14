const express = require('express');
const router = express.Router();
const Lawyer = require('../models/Lawyer');

const seedLawyers = [
  { name: "Adv. Ramesh Kumar Sharma", type: "nalsa", languages: ["Hindi", "English"], specialization: ["Bail Applications", "Criminal Defense"], state: "Madhya Pradesh", district: "Bhopal", available: true, verified: true },
  { name: "Adv. Priya Menon", type: "probono", languages: ["Tamil", "English"], specialization: ["Undertrial Rights", "Bail"], state: "Tamil Nadu", district: "Chennai", available: true, verified: true },
  { name: "Adv. Mohammed Iqbal", type: "telelaw", languages: ["Hindi", "Urdu"], specialization: ["Criminal Law", "NDPS"], state: "Uttar Pradesh", district: "Lucknow", available: false, verified: true },
  { name: "Adv. Sunita Devi", type: "nalsa", languages: ["Hindi", "Bengali"], specialization: ["Bail", "Women's Rights"], state: "Bihar", district: "Patna", available: true, verified: true },
  { name: "Adv. Arjun Nair", type: "probono", languages: ["Malayalam", "English"], specialization: ["Constitutional Rights"], state: "Kerala", district: "Kochi", available: true, verified: true },
  { name: "Adv. Fatima Sheikh", type: "telelaw", languages: ["Hindi", "English", "Urdu"], specialization: ["Criminal Defense"], state: "Maharashtra", district: "Mumbai", available: false, verified: true }
];

router.get('/', async (req, res) => {
  try {
    const count = await Lawyer.countDocuments();
    if (count === 0) {
      await Lawyer.insertMany(seedLawyers);
    }

    const { state, language, type, search } = req.query;
    const query = {};

    if (state) query.state = state;
    if (language) query.languages = { $in: [language] };
    if (type && type !== 'Sab' && type !== 'all' && type !== 'All') {
      const typeMap = { 'NALSA Panel': 'nalsa', 'Pro Bono': 'probono', 'Tele-Law': 'telelaw' };
      query.type = typeMap[type] || type;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const lawyers = await Lawyer.find(query);
    res.json({ lawyers, total: lawyers.length });
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
