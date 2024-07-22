const express = require('express');
const { addBorrowing } = require('../helpers/borrowHelper');
const router = express.Router();

router.post('/borrow', async (req, res) => {
  const { customerId, bookId } = req.body;
  try {
    await addBorrowing(customerId, bookId);
    res.status(201).send('Borrowing recorded successfully');
  } catch (error) {
    res.status(500).send('Failed to record borrowing');
  }
});

module.exports = router;
