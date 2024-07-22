const express = require('express');
const { addPurchase } = require('../helpers/purchasehelper');
const router = express.Router();

router.post('/purchase', async (req, res) => {
  const { customerId, bookId } = req.body;
  try {
    await addPurchase(customerId, bookId);
    res.status(201).send('Purchase recorded successfully');
  } catch (error) {
    res.status(500).send('Failed to record purchase');
  }
});

module.exports = router;
