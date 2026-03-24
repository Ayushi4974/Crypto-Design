const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ success: true, message: 'Dashboard stats route' }));

module.exports = router;
