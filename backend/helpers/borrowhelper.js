const BooksBorrowed = require('../models/BooksBorrowed');

const addBorrowing = async (customerId, bookId) => {
  try {
    const borrowing = new BooksBorrowed({
      customer: customerId,
      book: bookId
    });
    await borrowing.save();
    console.log('Borrowing record created and customer updated');
  } catch (error) {
    console.error('Error adding borrowing:', error);
  }
};

module.exports = { addBorrowing };
