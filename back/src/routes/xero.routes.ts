const express = require("express");
const router = express.Router;

const xero = require('../controllers/xero');

router.get('/balanceSheet', async (req, res) => {
  const result = await xero.get_balance_sheet();
  res.status(result.status).send(result.message);
});

module.exports = router;