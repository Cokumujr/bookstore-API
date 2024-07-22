const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    purchasedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BooksPurchased' }],
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BooksBorrowed' }],
}, { timestamps: true });

module.exports = mongoose.model("Customer", CustomerSchema);
