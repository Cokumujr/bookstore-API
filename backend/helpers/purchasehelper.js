const BooksPurchased = require('../models/booksPurchased');

const addPurchase = async (customerId, bookId) => {
  try {
    const purchase = new BooksPurchased({
      customer: customerId,
      book: bookId
    });
    await purchase.save();
    console.log('Purchase record created and customer updated');
  } catch (error) {
    console.error('Error adding purchase:', error);
  }
};

module.exports = { addPurchase };
