const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksBorrowedSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
}, { timestamps: true });

// Middleware to update customer document
booksBorrowedSchema.post('save', async function(doc) {
  await mongoose.model('Customer').findByIdAndUpdate(doc.customer, {
    $push: { booksBorrowed: doc._id }
  });
});

module.exports = mongoose.model('BooksBorrowed', booksBorrowedSchema);
