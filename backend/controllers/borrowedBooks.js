const BooksBorrowed = require("../models/borrowedBooks");

const borrowBook = async(req, res) => {
    try {
        const { bookId } = req.body;

        // Create a new borrowed book entry
        const borrowedBook = new BooksBorrowed({
            user: req.user.id,
            book: bookId
        });

        await borrowedBook.save();

        res.status(201).json({ message: 'Book borrowed successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

const borrowedBooks = async(req, res) => {
    try {
        // Find all borrowed books for the current user
        const borrowedBooks = await BooksBorrowed.find({ user: req.user.id }).populate('book');
        res.json(borrowedBooks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

module.exports = {
    borrowBook,
    borrowedBooks
}