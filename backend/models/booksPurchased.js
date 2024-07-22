const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const booksPurchasedSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  purchaseDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Middleware to update customer document
booksPurchasedSchema.post('save', async function(doc) {
  await mongoose.model('Customer').findByIdAndUpdate(doc.customer, {
    $push: { booksPurchased: doc._id }
  });
});

module.exports = mongoose.model('BooksPurchased', booksPurchasedSchema);
